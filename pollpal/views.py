from .models import Poll, Choice, Vote, Date, Time,DateVote
from .serializers import PollSerializer, ChoiceSerializer, VoteSerializer,DateSerializer,TimeSerializer,DateVoteSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.http import Http404


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    @action(detail=False, methods=['post'])
    def create_with_choices(self, request):
        # poll data
        poll_data = request.data  
        # get choices_data
        choices_data = poll_data.pop('choices', [])  
        # pass data to poll_serializer
        poll_serializer = PollSerializer(data=poll_data)
        #if valid we save
        if poll_serializer.is_valid():
            poll = poll_serializer.save()
            #loop throuh the choices array
            for choice_text in choices_data:
                # make choice data obj and we pass poll id and text
                choice_data = {'poll_id': poll.id, 'choice_text': choice_text}
                # pass it to serializer
                choice_serializer = ChoiceSerializer(data=choice_data)
                # valid and save
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    poll.delete()  
                    return Response(choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_201_CREATED)
        return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    @action(detail=False, methods=['post'])
    def create_poll_with_dates_times(self, request):
        #poll date
        poll_data = request.data
        #dates array
        dates_data = poll_data.pop('dates', [])
        #pass poll data to array and save if valid
        poll_serializer = PollSerializer(data=poll_data)
        if poll_serializer.is_valid():
            poll = poll_serializer.save()
            # loop through dates data
            for date_data in dates_data:
                #assign poll id
                date_data['poll_id'] = poll.id
                #get times array
                times_data = date_data.get('times', [])
                #pass to serializer and save
                for time_data in times_data:
                    for time_slot in times_data:
                        time_instance = Time.objects.create(
                            start_time=time_slot['start_time'],
                            end_time=time_slot['end_time']
                        )
                    date_serializer = DateSerializer(data=date_data)
                    if date_serializer.is_valid():
                        date = date_serializer.save()
                        date.times.add(time_instance)
                    
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

    def create(self, request):
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class PollVotesListViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VoteSerializer

    def get_queryset(self):
        poll_id = self.kwargs.get('poll_id')
        if poll_id:
            return Vote.objects.filter(poll_id=poll_id)
        raise Http404
 
class DatesViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer

class TimesViewSet(viewsets.ModelViewSet):
    queryset = Time.objects.all()
    serializer_class = TimeSerializer



class DateVoteViewSet(viewsets.ModelViewSet):
    queryset = DateVote.objects.all()
    serializer_class = DateVoteSerializer
    def create(self, request):
        voter_ip = request.data.get('voter_ip')
        poll_ip = request.data.get('poll_id')

        raise Http404