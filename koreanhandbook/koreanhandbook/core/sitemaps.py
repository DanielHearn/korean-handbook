from django.contrib.sitemaps import Sitemap
from .models import *

from koreanhandbook.urls import urlpatterns
from django.core.urlresolvers import reverse

class StaticSitemap(Sitemap):
     priority = 0.8
     changefreq = 'weekly'

     # The below method returns all urls defined in urls.py file
     def items(self):
        mylist = [ ]
        for url in urlpatterns:
            mylist.append('home:'+url.name) 
        return mylist

     def location(self, item):
         return reverse(item)


class InfoSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
       return Info.objects.all()

class ToolSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
       return Tool.objects.all()

class ProfileSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
       return Profile.objects.all()
