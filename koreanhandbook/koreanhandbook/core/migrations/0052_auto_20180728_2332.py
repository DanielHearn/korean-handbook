# Generated by Django 2.0.4 on 2018-07-28 22:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0051_word_collection'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='profile',
        ),
        migrations.DeleteModel(
            name='Word_Collection',
        ),
        migrations.DeleteModel(
            name='Member',
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
