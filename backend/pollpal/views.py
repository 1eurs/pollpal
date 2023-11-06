from .models import CustomUser, Poll, Choice, Vote, Date, Time, DateVote, Comment
from .serializers import (
    CustomUserSerializer,
    PollSerializer,
    ChoiceSerializer,
    VoteSerializer,
    DateSerializer,
    TimeSerializer,
    DateVoteSerializer,
    NameSerializer,
    CommentSerializer,
)
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.http import Http404
from pprint import pprint
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    @action(detail=False, methods=["post"])
    def create_with_choices(self, request):
        poll_data = request.data
        choices_data = poll_data.pop("choices", [])
        poll_serializer = PollSerializer(data=poll_data)

        if poll_serializer.is_valid():
            poll = poll_serializer.save()
            for choice_text in choices_data:
                choice_data = {"poll_id": poll.id, "choice_text": choice_text}
                choice_serializer = ChoiceSerializer(data=choice_data)
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
            return Response(response_data, status=200)
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

                if times_data == []:
                    date_serializer = DateSerializer(data=date_data)
                    if date_serializer.is_valid():
                        date = date_serializer.save()
                else:
                    for time_data in times_data:
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
            return Response(response_data, status=200)
        else:
            return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

    def create(self, request):
        try:
            voter_ip = request.META.get("REMOTE_ADDR")
            request.data["voter_ip"] = voter_ip

            if request.data["choice_id"] is None:
                return Response({"message": "No date choices provided"}, status=400)

            serializer = VoteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)

        except IntegrityError:
            return Response(
                {"message": "You have already voted in this poll."}, status=400
            )


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
        try:
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
            return Response(serializer.data, status=200)
        except IntegrityError:
            return Response(
                {"message": "You have already voted in this poll."}, status=400
            )

        except Exception as e:
            return Response({"message": "No date choices provided"}, status=400)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_top_level_comments(self, request, *args, **kwargs):
        top_level_comments = Comment.objects.filter(parent_comment=None)
        serializer = self.get_serializer(top_level_comments, many=True)
        return Response(serializer.data)

    def get_comments_with_parents(self, request, *args, **kwargs):
        comments_with_parents = Comment.objects.exclude(parent_comment=None)
        serializer = self.get_serializer(comments_with_parents, many=True)
        return Response(serializer.data)
