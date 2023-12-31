# Generated by Django 4.2.6 on 2023-11-11 01:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('choice_text', models.CharField(max_length=200)),
                ('vote_count', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Date',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('vote_count_true', models.IntegerField(default=0)),
                ('vote_count_false', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='DateVote',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('voter_ip', models.GenericIPAddressField()),
                ('can_attend', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('date_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollpal.date')),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=200)),
                ('poll_type', models.CharField(choices=[('choices', 'Multiple Choice Poll'), ('dates', 'Meeting Poll')], default='choices', max_length=300)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('allow_comments', models.BooleanField(default=False)),
                ('require_names', models.BooleanField(default=False)),
                ('can_share', models.BooleanField(default=True)),
                ('captcha', models.BooleanField(default=False)),
                ('voting_security_option', models.CharField(choices=[('multiple', 'Multiple Votes per Person'), ('ip', 'One Vote per IP Address'), ('code', 'One Vote per Unique Code')], default='ip', max_length=300)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Time',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('start_time', models.DateTimeField(blank=True, null=True)),
                ('end_time', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('voter_ip', models.GenericIPAddressField(blank=True, null=True, unpack_ipv4=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('choice_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pollpal.choice')),
                ('poll_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='pollpal.poll')),
            ],
        ),
        migrations.CreateModel(
            name='Name',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date_vote', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, to='pollpal.datevote')),
                ('poll', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='pollpal.poll')),
                ('vote', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, to='pollpal.vote')),
            ],
        ),
        migrations.AddField(
            model_name='datevote',
            name='poll_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='date_votes', to='pollpal.poll'),
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
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('comment_text', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('parent_comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='replies', to='pollpal.comment')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollpal.poll')),
            ],
        ),
        migrations.AddField(
            model_name='choice',
            name='poll_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pollpal.poll'),
        ),
    ]
