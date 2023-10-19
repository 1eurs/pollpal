# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DateVoteViewSet,
    PollViewSet,
    ChoiceViewSet,
    VoteViewSet,
    DatesViewSet,
    TimesViewSet,
    PollVotesListViewSet,
    CommentViewSet,
)

router = DefaultRouter()
router.register(r"polls", PollViewSet)
router.register(r"choices", ChoiceViewSet)
router.register(r"votes", VoteViewSet)
router.register(r"dates", DatesViewSet)
router.register(r"times", TimesViewSet)
router.register(r"datevotes", DateVoteViewSet)
router.register(r"comments", CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "vote/<uuid:poll_id>/",
        PollVotesListViewSet.as_view({"get": "list"}),
        name="poll-vote-list",
    ),
]
