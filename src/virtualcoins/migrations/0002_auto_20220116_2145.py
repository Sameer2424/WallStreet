# Generated by Django 3.1.7 on 2022-01-16 16:15

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0006_auto_20220112_1541"),
        ("virtualcoins", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="offer",
            name="crickcoins_required",
            field=models.IntegerField(default=1000),
        ),
        migrations.AddField(
            model_name="offer",
            name="is_redeemable",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="offer",
            name="total_redeemable_units",
            field=models.IntegerField(default=999999),
        ),
        migrations.AlterField(
            model_name="brand",
            name="category",
            field=models.CharField(
                blank=True,
                choices=[
                    ("Entertainment Subscriptions", "Entertainment Subscriptions"),
                    ("Apparel & Accessories", "Apparel & Accessories"),
                    ("Food & Beverage", "Food & Beverage"),
                    ("Mobile & Electronics", "Mobile & Electronics"),
                    ("Health & Wellness", "Health & Wellness"),
                    ("Magazines Subscriptions", "Magazines Subscriptions"),
                    ("Cabs & Travels", "Cabs & Travels"),
                    ("Sports", "Sports"),
                ],
                max_length=100,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="brand",
            name="logo",
            field=models.ImageField(
                blank=True,
                upload_to="brandlogos/%Y/%m/%d",
                validators=[
                    django.core.validators.FileExtensionValidator(
                        ["jpeg", "jpg", "svg"]
                    )
                ],
            ),
        ),
        migrations.CreateModel(
            name="OfferRedemption",
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
                    "offer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="virtualcoins.offer",
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