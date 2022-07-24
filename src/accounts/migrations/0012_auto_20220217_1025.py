# Generated by Django 3.1.7 on 2022-02-17 04:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0011_auto_20220216_1927"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userfollowing",
            name="following_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user_following",
                to="accounts.userprofile",
            ),
        ),
        migrations.AlterField(
            model_name="userfollowing",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user_follower",
                to="accounts.userprofile",
            ),
        ),
    ]