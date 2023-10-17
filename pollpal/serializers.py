from rest_framework import serializers
from .models import Poll, Choice, Vote, Date, Time,DateVote
from datetime import datetime


        
class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = '__all__'

class DateSerializer(serializers.ModelSerializer):
    times = TimeSerializer(many=True, read_only=True)
    poll = PollSerializer(read_only=True)
    class Meta:
        model = Date
        fields = '__all__'

class DateVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateVote
        fields = '__all__'


