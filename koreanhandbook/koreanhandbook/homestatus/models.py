# Future imports
from __future__ import unicode_literals

# Django imports
from django.conf import settings
from django.db import models
from datetime import datetime

class Status(models.Model):
    temp_value = models.IntegerField(default='0')
    humidity_value = models.IntegerField(default='0')
    date_inserted = models.DateTimeField(default=datetime.now())
    def __str__(self):
      return 'Status: ' + str(self.date_inserted)