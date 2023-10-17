from django.db import models
from django.contrib.auth.models import User
import uuid

class Poll(models.Model):
    POLL_TYPE_CHOICES = [
        ('multiple_choice', 'Multiple Choice Poll'),
        ('meeting', 'Meeting Poll'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=200)
    poll_type = models.CharField(
        max_length=200,
        choices=POLL_TYPE_CHOICES,
        default='multiple_choice' 
    )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


class Time(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class Date(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField()
    times = models.ManyToManyField(Time) 
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE)

    def update_vote_count(self):
        self.vote_count = self.DateVote_set.count()
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
    voter_ip = models.GenericIPAddressField()
    choice_id = models.ForeignKey(Choice, on_delete=models.CASCADE, null=True, blank=True) 
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='votes')  
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # After saving the vote, update the vote count for the associated choice
        if self.choice_id:
            self.choice_id.update_vote_count()


class DateVote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter_ip = models.GenericIPAddressField()
    date_id = models.ForeignKey(Date, on_delete=models.CASCADE)
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='date_votes')  
    can_attend = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
            super().save(*args, **kwargs)
            if self.choice_id:
                self.choice_id.update_vote_count()