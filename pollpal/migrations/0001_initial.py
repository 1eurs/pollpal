# Generated by Django 4.2.6 on 2023-10-15 04:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('choice_text', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Date',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=200)),
                ('poll_type', models.CharField(choices=[('multiple_choice', 'Multiple Choice Poll'), ('meeting', 'Meeting Poll'), ('ranking', 'Ranking Poll')], default='multiple_choice', max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Time',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.CharField(max_length=200)),
                ('end_time', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('voter_ip', models.GenericIPAddressField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('choice_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pollpal.choice')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('date_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pollpal.date')),
                ('poll_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='pollpal.poll')),
            ],
        ),
        migrations.CreateModel(
            name='DateVote',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('voter_ip', models.GenericIPAddressField()),
                ('can_attend', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('date_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollpal.date')),
                ('poll_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='date_votes', to='pollpal.poll')),
            ],
        ),
        migrations.AddField(
            model_name='date',
            name='poll_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollpal.poll'),
        ),
        migrations.AddField(
            model_name='date',
            name='times',
            field=models.ManyToManyField(to='pollpal.time'),
        ),
        migrations.AddField(
            model_name='choice',
            name='poll_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollpal.poll'),
        ),
    ]
