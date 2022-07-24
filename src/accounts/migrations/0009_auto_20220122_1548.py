# Generated by Django 3.1.7 on 2022-01-22 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0008_potentialuser_waitlist_amount"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="address",
            field=models.CharField(blank=True, default="", max_length=200),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="address2",
            field=models.CharField(blank=True, default="", max_length=200),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="city",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="state",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="zip_code",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
    ]
