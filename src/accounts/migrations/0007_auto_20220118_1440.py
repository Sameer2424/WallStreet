# Generated by Django 3.1.7 on 2022-01-18 09:10

import datetime
import django.core.validators
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0006_auto_20220112_1541"),
    ]

    operations = [
        migrations.RemoveField(model_name="potentialuser", name="status",),
        migrations.RemoveField(model_name="potentialuser", name="user",),
        migrations.AddField(
            model_name="potentialuser",
            name="created",
            field=models.DateTimeField(
                auto_now_add=True,
                default=datetime.datetime(2022, 1, 18, 9, 10, 5, 110931, tzinfo=utc),
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="potentialuser",
            name="email",
            field=models.EmailField(max_length=255, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="potentialuser",
            name="mobile",
            field=models.CharField(
                max_length=15,
                null=True,
                validators=[
                    django.core.validators.RegexValidator(
                        code="invalid_phone_number",
                        message="Phone number entered is invalid",
                        regex="^\\+?1?\\d{9,15}$",
                    )
                ],
            ),
        ),
        migrations.AddField(
            model_name="potentialuser",
            name="modified",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="potentialuser",
            name="source",
            field=models.CharField(default="", max_length=255),
            preserve_default=False,
        ),
    ]