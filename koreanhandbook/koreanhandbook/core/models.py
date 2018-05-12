# Future imports
from __future__ import unicode_literals

# Django imports
from django.conf import settings
from django.db import models


class Tool(models.Model):
    full_name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=100, default='priority_high')
    def __str__(self):
       return 'Tool: ' + self.full_name

class Info(models.Model):
    full_name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=100)
    num_colums =  models.IntegerField()
    column_1_name = models.CharField(max_length=100)
    column_2_name =  models.CharField(max_length=100)
    alphanumeric_order = models.BooleanField(default=False)
    icon_name = models.CharField(max_length=100, default='priority_high')
    description = models.TextField(default='')
    def __str__(self):
       return 'Info: ' + self.full_name

class Row_2(models.Model):
    info = models.ForeignKey(Info, on_delete=models.CASCADE)
    col_1 = models.CharField(max_length=255)
    col_2 = models.CharField(max_length=255)
    def __str__(self):
      return 'Row' + self.info.short_name + ' : ' + str(self.id)
