# Generated by Django 3.1.7 on 2022-01-14 12:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0006_auto_20220112_1541"),
        ("rest_api", "0004_auto_20220102_2000"),
    ]

    operations = [
        migrations.CreateModel(
            name="ReportPitch",
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
                (
                    "report_type",
                    models.CharField(
                        choices=[
                            ("Harassment", "Harassment"),
                            ("Spam", "Spam"),
                            ("Plagiarism", "Plagiarism"),
                            ("Poorly Written", "Poorly Written"),
                            ("Factually Incorrect", "Factually Incorrect"),
                            ("Adult Content", "Adult Content"),
                        ],
                        max_length=50,
                    ),
                ),
                ("report_message", models.TextField(blank=True, null=True)),
                (
                    "pitch",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="rest_api.pitch"
                    ),
                ),
                (
                    "userprofile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="accounts.userprofile",
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
    ]