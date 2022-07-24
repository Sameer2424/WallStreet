# Generated by Django 3.1.7 on 2021-12-15 12:39

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("accounts", "0004_auto_20211215_1739"),
    ]

    operations = [
        migrations.CreateModel(
            name="Pitch",
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
                ("message", models.TextField()),
                (
                    "visible_to",
                    models.CharField(
                        choices=[("Friends", "Friends"), ("Public", "Public")],
                        default="Public",
                        max_length=50,
                    ),
                ),
                (
                    "image",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to="champhunt/pitches/%Y/%m/%d/",
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                allowed_extensions=["jpg", "jpeg", "png", "pdf"]
                            )
                        ],
                    ),
                ),
                ("url_link", models.URLField(blank=True, null=True)),
                ("runs", models.IntegerField(default=0)),
                (
                    "userprofile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="accounts.userprofile",
                    ),
                ),
            ],
        ),
    ]
