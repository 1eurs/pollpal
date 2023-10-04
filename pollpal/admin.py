from django.contrib import admin
from .models import Poll, Choice, Vote


@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'created_by', 'created_at', 'is_active')
    list_filter = ('created_by', 'created_at', 'is_active')
    search_fields = ('question', 'created_by__username')


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'poll_id', 'choice_text')
    list_filter = ('poll_id',)
    search_fields = ('choice_text', 'poll_id__question')


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'voter_ip', 'choice_id', 'created_at')
    list_filter = ('choice_id__poll_id', 'created_at')
    search_fields = ('voter_ip', 'choice_id__choice_text')
