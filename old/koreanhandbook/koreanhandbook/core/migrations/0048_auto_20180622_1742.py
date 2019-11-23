# Generated by Django 2.0.4 on 2018-06-22 16:42

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0047_row_2_is_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='info',
            name='thumbnail',
            field=imagekit.models.fields.ProcessedImageField(default='default.jpg', upload_to='./thumbnails'),
        ),
        migrations.AddField(
            model_name='profile',
            name='thumbnail',
            field=imagekit.models.fields.ProcessedImageField(default='default.jpg', upload_to='./thumbnails'),
        ),
        migrations.AddField(
            model_name='tool',
            name='thumbnail',
            field=imagekit.models.fields.ProcessedImageField(default='default.jpg', upload_to='./thumbnails'),
        ),
    ]