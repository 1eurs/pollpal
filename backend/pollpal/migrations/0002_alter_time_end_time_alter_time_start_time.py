# Generated by Django 4.2.6 on 2023-10-29 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pollpal', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='time',
            name='end_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='time',
            name='start_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
