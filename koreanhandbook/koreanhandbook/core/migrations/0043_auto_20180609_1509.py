# Generated by Django 2.0.4 on 2018-06-09 14:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0042_auto_20180609_1508'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tool',
            old_name='thumbnail',
            new_name='picture',
        ),
    ]