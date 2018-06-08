from django.contrib.sitemaps import Sitemap

from koreanhandbook.core.models import Info

class InfoSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return Info.objects.all()