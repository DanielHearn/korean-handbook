# Generated by Django 2.0.4 on 2018-06-08 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0037_auto_20180607_2216'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='group_type',
            field=models.CharField(choices=[('BOYGROUP', 'Boy Group'), ('GIRLGROUP', 'Girly Group'), ('COEDGROUP', 'Co-ed Group'), ('SOLOIST', 'Soloist')], default='1', max_length=100),
        ),
    ]
