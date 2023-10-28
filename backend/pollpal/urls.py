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
    path(
        "comments/top-level/",
        CommentViewSet.as_view({"get": "get_top_level_comments"}),
        name="comment-top-level",
    ),
    path(
        "replies/",
        CommentViewSet.as_view({"get": "get_comments_with_parents"}),
        name="comments_with_parents",
    ),
    path("", include(router.urls)),
]
