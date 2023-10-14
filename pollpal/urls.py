from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PollViewSet, ChoiceViewSet, VoteViewSet,DatesViewSet,TimesViewSet

router = DefaultRouter()
router.register(r'polls', PollViewSet)
router.register(r'choices', ChoiceViewSet)
router.register(r'votes', VoteViewSet)
router.register(r'dates', DatesViewSet)
router.register(r'times', TimesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
