# Generated by Django 2.0.4 on 2018-05-30 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0028_auto_20180530_1118'),
    ]

    operations = [
        migrations.AddField(
            model_name='info',
            name='home_focus',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='tool',
            name='home_focus',
            field=models.BooleanField(default=False),
        ),
    ]