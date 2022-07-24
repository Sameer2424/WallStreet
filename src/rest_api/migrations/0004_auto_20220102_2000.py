# Generated by Django 3.1.7 on 2022-01-02 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("rest_api", "0003_auto_20211217_1347"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pitch",
            name="message",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AlterField(
            model_name="pitch",
            name="tags",
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name="pitch",
            name="url_link",
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
