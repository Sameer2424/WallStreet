# Generated by Django 3.1.7 on 2022-02-05 13:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0009_auto_20220122_1548"),
        ("rest_api", "0005_reportpitch"),
    ]

    operations = [
        migrations.AddField(
            model_name="pitch",
            name="shared_body",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="pitch",
            name="shared_user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="+",
                to="accounts.userprofile",
            ),
        ),
    ]
