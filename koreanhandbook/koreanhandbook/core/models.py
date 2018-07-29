# Future imports
from __future__ import unicode_literals

# Django imports
from django.conf import settings
from django.db import models
from django.utils.timezone import now
from imagekit.models import ProcessedImageField, ImageSpecField
from imagekit.processors import ResizeToFill
from storages.backends.s3boto3 import S3Boto3Storage

class Tool(models.Model):
    full_name = models.CharField(max_length=100)
    korean_name = models.CharField(max_length=100, default='한국어')
    short_name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    description = models.TextField(default='Tool description.')
    home_focus = models.BooleanField(default=False)
    picture = ProcessedImageField(upload_to='./images',
                                           processors=[ResizeToFill(800, 500)],
                                           format='JPEG',
                                           options={'quality': 70},
                                           default='default.jpg')         
    def __str__(self):
       return 'Tool: ' + self.full_name
    def get_absolute_url(self):
        return '/tool/'+ self.short_name + '/'

class Info(models.Model):
    full_name = models.CharField(max_length=100, default='Full Name')
    short_name = models.CharField(max_length=100, default='shortname')
    korean_name = models.CharField(max_length=100, default='한국어')
    num_colums =  models.IntegerField(default='2')
    column_1_name = models.CharField(max_length=100, default='col1')
    column_2_name =  models.CharField(max_length=100, default='col2')
    column_3_name =  models.CharField(max_length=100, default='col3')
    home_focus = models.BooleanField(default=False)
    alphanumeric_order = models.BooleanField(default=False)
    numeric_first_col = models.BooleanField(default=False)
    description = models.TextField(default='The Korean names for the _ with their English translations.')
    picture = ProcessedImageField(upload_to='./images',
                                           processors=[ResizeToFill(800, 500)],
                                           format='JPEG',
                                           options={'quality': 70},
                                           default='default.jpg')       
    def __str__(self):
        return 'Info: ' + self.full_name
    def get_absolute_url(self):
        return '/info/'+ self.short_name + '/'

class Row_2(models.Model):
    info = models.ForeignKey(Info, on_delete=models.CASCADE, blank=True)
    col_1 = models.CharField(max_length=255)
    col_2 = models.CharField(max_length=255)
    is_link = models.BooleanField(default=False)
    date_inserted = models.DateTimeField(default=now, blank=True)
    def __str__(self):
      return 'Row2' + self.info.short_name + ' : ' + str(self.id)

class Row_3(models.Model):
    info = models.ForeignKey(Info, on_delete=models.CASCADE, blank=True)
    col_1 = models.CharField(max_length=255)
    col_2 = models.CharField(max_length=255)
    col_3 = models.CharField(max_length=255)
    date_inserted = models.DateTimeField(default=now, blank=True)
    def __str__(self):
      return 'Row3' + self.info.short_name + ' : ' + str(self.id)