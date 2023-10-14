from .models import Poll, Choice, Vote, Date, Time
from .serializers import PollSerializer, ChoiceSerializer, VoteSerializer,DateSerializer,TimeSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    @action(detail=False, methods=['post'])
    def create_with_choices(self, request):
        poll_data = request.data  
        choices_data = poll_data.pop('choices', [])  
        poll_serializer = PollSerializer(data=poll_data)
        if poll_serializer.is_valid():
            poll = poll_serializer.save()
            for choice_text in choices_data:
                choice_data = {'poll_id': poll.id, 'choice_text': choice_text}
                choice_serializer = ChoiceSerializer(data=choice_data)
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    poll.delete()  
                    return Response(choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
        return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    @action(detail=False, methods=['post'])
    def create_poll_with_dates_times(self, request):
        poll_data = request.data
        dates_data = poll_data.pop('dates', [])

        poll_serializer = PollSerializer(data=poll_data)

        if poll_serializer.is_valid():
            poll = poll_serializer.save()

            for date_data in dates_data:
                date_data['poll_id'] = poll.id
                times_data = date_data.get('times', [])

                date_serializer = DateSerializer(data=date_data)

                print(date_data)

                if date_serializer.is_valid():
                    date = date_serializer.save()

                    for time_data in times_data:
                        # Create a new Time instance with the provided start_time and end_time
                        time_instance = Time.objects.create(
                            start_time=time_data['start_time'],
                            end_time=time_data['end_time']
                        )

                        # Associate the Time instance with the Date instance
                        date.times.add(time_instance)

            return Response(status=status.HTTP_201_CREATED)

        else:
            print("Poll Serializer Errors:", poll_serializer.errors)
            return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

class DatesViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer

class TimesViewSet(viewsets.ModelViewSet):
    queryset = Time.objects.all()
    serializer_class = TimeSerializer
