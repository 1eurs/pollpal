from rest_framework import serializers
from .models import Poll, Choice, Vote, Date, Time
from datetime import datetime


class CustomDateField(serializers.DateField):
    def to_representation(self, value):
        return value.strftime('%Y/%m/%d')

    def to_internal_value(self, data):
        try:
            return datetime.strptime(data, '%Y/%m/%d').date()
        except ValueError:
            raise serializers.ValidationError("Invalid date format. Please use 'YYYY/MM/DD'.")
        
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
    date = CustomDateField(format='%Y/%m/%d')
    times = TimeSerializer(many=True, read_only=True)
    poll = PollSerializer(read_only=True)
    class Meta:
        model = Date
        fields = '__all__'