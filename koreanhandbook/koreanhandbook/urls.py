"""koreanhandbook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from koreanhandbook.core import views as core_views
from koreanhandbook.core.sitemaps import InfoSiteMap

sitemaps = {
    'info': InfoSiteMap()
}

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^sitemap.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': sitemaps}),
    url(r'^robots.txt$', include('robots.urls')),
    url(r'^$', core_views.home, name='home'),
    url('search/', core_views.search, name='search'),
    url('about/', core_views.about, name='about'),
    url(r'kpopprofiles/(?P<profile_name>\w+/)$', core_views.kpopprofile, name='profile_name'),
    url('kpopprofiles/', core_views.kpopprofiles, name='kpopprofiles'),
    url(r'tool/(?P<tool_name>\w+/)$', core_views.tool, name='tool'),
    url(r'info/(?P<info_name>\w+/)$', core_views.info, name='info'),
]
