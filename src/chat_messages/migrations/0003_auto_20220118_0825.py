# Generated by Django 3.1.7 on 2022-01-18 02:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("chat_messages", "0002_delete_contact"),
    ]

    operations = [
        migrations.RenameField(
            model_name="chatmessage", old_name="timestamp", new_name="created",
        ),
        migrations.RenameField(
            model_name="chatmessage", old_name="user", new_name="sender",
        ),
        migrations.RenameField(
            model_name="chatmessage", old_name="message", new_name="text",
        ),
        migrations.AddField(
            model_name="chatmessage",
            name="image",
            field=models.ImageField(
                blank=True, null=True, upload_to="chatmessages/%Y/%m/%d"
            ),
        ),
        migrations.AddField(
            model_name="chatmessage",
            name="is_read",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="chatmessage",
            name="modified",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.CreateModel(
            name="Thread",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "thread_type",
                    models.CharField(
                        choices=[("personal", "Personal"), ("group", "Group")],
                        default="group",
                        max_length=15,
                    ),
                ),
                ("has_unread", models.BooleanField(default=False)),
                ("users", models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={"abstract": False,},
        ),
        migrations.AddField(
            model_name="chatmessage",
            name="thread",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="chat_messages.thread",
            ),
            preserve_default=False,
        ),
    ]
