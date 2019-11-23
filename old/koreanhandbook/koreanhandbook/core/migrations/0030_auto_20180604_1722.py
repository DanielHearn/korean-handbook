# Generated by Django 2.0.4 on 2018-06-04 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0029_auto_20180530_1143'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='info',
            name='icon_name',
        ),
        migrations.RemoveField(
            model_name='tool',
            name='icon_name',
        ),
        migrations.AddField(
            model_name='tool',
            name='korean_name',
            field=models.CharField(default='한국어', max_length=100),
        ),
    ]