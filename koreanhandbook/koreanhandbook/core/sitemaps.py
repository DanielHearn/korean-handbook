from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import *

class StaticSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
       return ['kpopprofiles']
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
