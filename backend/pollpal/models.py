from django.db import models
from django.contrib.auth.models import User
import uuid
from django.db import IntegrityError
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    created_polls = models.ManyToManyField(
        "Poll", related_name="created_by_user", blank=True
    )


class Poll(models.Model):
    SECURITY_CHOICES = [
        ("multiple", "Multiple Votes per Person"),
        ("ip", "One Vote per IP Address"),
        ("code", "One Vote per Unique Code"),
    ]

    POLL_TYPE_CHOICES = [
        ("choices", "Multiple Choice Poll"),
        ("dates", "Meeting Poll"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=200)
    poll_type = models.CharField(
        max_length=300, choices=POLL_TYPE_CHOICES, default="choices"
    )
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    allow_comments = models.BooleanField(default=False)
    require_names = models.BooleanField(default=False)
    can_share = models.BooleanField(default=True)
    captcha = models.BooleanField(default=False)
    voting_security_option = models.CharField(
        max_length=300, choices=SECURITY_CHOICES, default="ip"
    )


class Time(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)


class Date(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField()
    times = models.ManyToManyField(Time)
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE)
    vote_count_true = models.IntegerField(default=0)
    vote_count_false = models.IntegerField(default=0)

    def update_vote_count(self):
        self.vote_count_true = DateVote.objects.filter(
            date_id=self, can_attend=True
        ).count()
        self.vote_count_false = DateVote.objects.filter(
            date_id=self, can_attend=False
        ).count()
        self.save()


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    vote_count = models.IntegerField(default=0)

    def update_vote_count(self):
        self.vote_count = self.vote_set.count()
        self.save()


class Vote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter_ip = models.GenericIPAddressField(
        protocol="both", unpack_ipv4=True, null=True, blank=True
    )
    choice_id = models.ForeignKey(
        Choice, on_delete=models.CASCADE, null=True, blank=True
    )
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="votes")
    created_at = models.DateTimeField(auto_now_add=True)

    def is_unique_vote_per_poll_and_voter(self):
        if self.poll_id.voting_security_option == "ip":
            return (
                Vote.objects.filter(
                    poll_id=self.poll_id, voter_ip=self.voter_ip
                ).count()
                == 0
            )
        else:
            return True

    def save(self, *args, **kwargs):
        if self.is_unique_vote_per_poll_and_voter():
            if self.choice_id:
                self.choice_id.update_vote_count()
            super().save(*args, **kwargs)
        else:
            raise IntegrityError("This vote violates the uniqueness constraint.")

        if self.choice_id:
            self.choice_id.update_vote_count()


class DateVote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter_ip = models.GenericIPAddressField()
    date_id = models.ForeignKey(Date, on_delete=models.CASCADE)
    poll_id = models.ForeignKey(
        Poll, on_delete=models.CASCADE, related_name="date_votes"
    )
    can_attend = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.poll_id.voting_security_option == "ip":
            if DateVote.objects.filter(
                voter_ip=self.voter_ip, poll_id=self.poll_id, date_id=self.date_id
            ).exists():
                raise IntegrityError("You have already voted in this poll.")
        super().save(*args, **kwargs)
        if self.date_id:
            self.date_id.update_vote_count()


class Name(models.Model):
    name = models.CharField(max_length=100)
    poll = models.OneToOneField(Poll, on_delete=models.CASCADE)
    vote = models.OneToOneField(Vote, blank=True, on_delete=models.CASCADE)
    date_vote = models.OneToOneField(DateVote, blank=True, on_delete=models.CASCADE)


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey(
        "self", on_delete=models.SET_NULL, null=True, blank=True, related_name="replies"
    )
