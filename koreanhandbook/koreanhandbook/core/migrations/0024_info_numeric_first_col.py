# Generated by Django 2.0.4 on 2018-05-17 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0023_info_alphanumeric_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='info',
            name='numeric_first_col',
            field=models.BooleanField(default=False),
        ),
    ]
