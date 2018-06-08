# Future imports
from __future__ import unicode_literals

# Django imports
from django.conf import settings
from django.db import models
from django.utils.timezone import now
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

BOYGROUP = "BOYGROUP"
GIRLGROUP = "GIRLGROUP"
COEDGROUP = "COEDGROUP"
SOLOIST = "SOLOIST"

PROFILE_CHOICES = (
    (BOYGROUP, "Boy Group"),
    (GIRLGROUP, "Girl Group"),
    (COEDGROUP, "Co-ed Group"),
    (SOLOIST, "Soloist"),
)

class Tool(models.Model):
    full_name = models.CharField(max_length=100)
    korean_name = models.CharField(max_length=100, default='한국어')
    short_name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    home_focus = models.BooleanField(default=False)
    def __str__(self):
       return 'Tool: ' + self.full_name
    def get_absolute_url(self):
        return '/tool/'+ self.short_name

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
    def __str__(self):
        return 'Info: ' + self.full_name
    def get_absolute_url(self):
        return '/info/'+ self.short_name

class Profile(models.Model):
    full_name = models.CharField(max_length=100, default='Full Name')
    short_name = models.CharField(max_length=100, default='shortname')
    korean_name = models.CharField(max_length=100, default='한국어')
    group_type = models.CharField(max_length=100, choices=PROFILE_CHOICES, default='1')
    debut_date = models.DateTimeField(default=now, blank=True)
    debut = models.CharField(max_length=100, default='Debut')
    agency = models.CharField(max_length=100, default='Agency')
    fandom = models.CharField(max_length=100, default='Fandom')
    picture = ProcessedImageField(upload_to='./images',
                                           processors=[ResizeToFill(1000, 600)],
                                           format='JPEG',
                                           options={'quality': 70},
                                           default='default.jpg')
    home_focus = models.BooleanField(default=False)
    date_inserted = models.DateTimeField(default=now, blank=True)
    def __str__(self):
        return 'Profile: ' + self.full_name
    def get_absolute_url(self):
        return '/kpopprofiles/'+ self.short_name

class Member(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    picture = ProcessedImageField(upload_to='./images',
                                           processors=[ResizeToFill(600, 400)],
                                           format='JPEG',
                                           options={'quality': 70},
                                           default='default.jpg')
    stage_name = models.CharField(max_length=100, default='Stage Name')
    birth_name = models.CharField(max_length=100, default='Birth Name')
    birth_date = models.DateTimeField(default=now, blank=True)
    birth_place = models.TextField(default='Birth Place')
    position = models.TextField(default='Position')
    height = models.TextField(default='Height')
    def __str__(self):
       return 'Member: ' + self.stage_name

class Row_2(models.Model):
    info = models.ForeignKey(Info, on_delete=models.CASCADE, blank=True)
    col_1 = models.CharField(max_length=255)
    col_2 = models.CharField(max_length=255)
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
