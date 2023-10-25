from .models import Poll, Choice, Vote, Date, Time, DateVote, Comment
from .serializers import (
    PollSerializer,
    ChoiceSerializer,
    VoteSerializer,
    DateSerializer,
    TimeSerializer,
    DateVoteSerializer,
    NameSerializer,
    CommentSerializer,
    RetrieveCommentSerializer,
)
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.http import Http404


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    @action(detail=False, methods=["post"])
    def create_with_choices(self, request):
        # poll data
        poll_data = request.data
        # get choices_data
        choices_data = poll_data.pop("choices", [])
        # pass data to poll_serializer
        poll_serializer = PollSerializer(data=poll_data)

        if poll_serializer.is_valid():
            poll = poll_serializer.save()
            # loop through the choices array
            for choice_text in choices_data:
                # make choice data object and pass poll id and text
                choice_data = {"poll_id": poll.id, "choice_text": choice_text}
                # pass it to the serializer
                choice_serializer = ChoiceSerializer(data=choice_data)
                # validate and save
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    poll.delete()
                    return Response(
                        choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )

            response_data = {
                "message": "Poll with choices created successfully",
                "poll_id": poll.id,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"])
    def create_poll_with_dates_times(self, request):
        poll_data = request.data
        dates_data = poll_data.pop("dates", [])

        poll_serializer = PollSerializer(data=poll_data)
        if poll_serializer.is_valid():
            poll = poll_serializer.save()
            for date_data in dates_data:
                date_data["poll_id"] = poll.id
                times_data = date_data.get("times", [])
                # pass to serializer and save
                for time_data in times_data:
                    if not time_data:
                        start_time = "2023-10-21T00:00:00.000Z"
                        end_time = "2023-10-21T00:00:00.000Z"
                    else:
                        start_time = time_data["start_time"]
                        end_time = time_data["end_time"]

                    time_instance = Time.objects.create(
                        start_time=start_time, end_time=end_time
                    )
                    date_serializer = DateSerializer(data=date_data)
                    if date_serializer.is_valid():
                        date = date_serializer.save()
                        date.times.add(time_instance)
            response_data = {
                "message": "Poll with choices created successfully",
                "poll_id": poll.id,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

    def create(self, request):
        voter_ip = request.META.get("REMOTE_ADDR")
        request.data["voter_ip"] = voter_ip

        name_data = NameSerializer(
            data={"name": request.data.get("name"), "name": request.data.get("name")}
        )
        if name_data.is_valid():
            name_data.save()

        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollVotesListViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VoteSerializer

    def get_queryset(self):
        poll_id = self.kwargs.get("poll_id")
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
        voter_ip = request.META.get("REMOTE_ADDR")
        poll_id = request.data.get("poll_id")
        poll = Poll.objects.get(pk=poll_id)
        date_choices = request.data.get("dateChoices")

        for choice in date_choices:
            date_id = choice.get("date_id")
            can_attend = choice.get("can_attend")
            date = Date.objects.get(pk=date_id)

            date_vote = DateVote(
                voter_ip=voter_ip, poll_id=poll, date_id=date, can_attend=can_attend
            )
            date_vote.save()

        serializer = DateVoteSerializer(date_vote)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = RetrieveCommentSerializer

    def create(self, request):
        data = request.data
        comment_id = data.get("commentId", None)
        if comment_id is not None:
            parent_comment = Comment.objects.get(id=comment_id)
            data["poll"] = parent_comment.poll.id
            data["parent_comment"] = comment_id
            serializer = CommentSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
        else:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
