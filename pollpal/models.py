from django.db import models
from django.contrib.auth.models import User
import uuid

class Poll(models.Model):
    POLL_TYPE_CHOICES = [
        ('multiple_choice', 'Multiple Choice Poll'),
        ('meeting', 'Meeting Poll'),
        ('ranking', 'Ranking Poll'),
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


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)


class Vote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    voter_ip = models.GenericIPAddressField()
    choice_id = models.ForeignKey(Choice, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Time(models.Model):
    start_time = models.CharField(max_length=200)
    end_time = models.CharField(max_length=200)

class Date(models.Model):
    date = models.DateTimeField()
    times = models.ManyToManyField(Time) 
    poll_id = models.ForeignKey(Poll, on_delete=models.CASCADE)