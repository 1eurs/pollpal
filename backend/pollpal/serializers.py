from rest_framework import serializers
from .models import CustomUser, Poll, Choice, Vote, Date, Time, DateVote, Name, Comment
from django.contrib.auth import get_user_model


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"


class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = "__all__"


class DateSerializer(serializers.ModelSerializer):
    times = TimeSerializer(many=True, read_only=True)
    poll = PollSerializer(read_only=True)

    class Meta:
        model = Date
        fields = "__all__"


class DateVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateVote
        fields = "__all__"


class NameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Name
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
