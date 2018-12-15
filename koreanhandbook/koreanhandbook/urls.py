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
from django.urls import path, reverse
from django.conf.urls import url, include, handler404
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from django.views.generic.base import RedirectView

from koreanhandbook.core import views as core_views
from koreanhandbook.core.sitemaps import *
from koreanhandbook.homestatus import views as homestatus_views

sitemaps = {
    'info': InfoSitemap(),
    'tool': ToolSitemap(),
    'static': StaticSitemap()
}

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
    url(r'^$', core_views.home, name='home'),
    url('search/', core_views.search, name='search'),
    url('about/', core_views.about, name='about'),
    url(r'tool/(?P<tool_name>[-\w]+/)$', core_views.tool, name='tool'),
    url(r'info/(?P<info_name>[-\w]+/)$', core_views.info, name='info'),
    url('info/', core_views.infos, name='infos'),
    url('homestatus', homestatus_views.status , name='status'),
    url('api/random-words', core_views.api_random_word, name='random-words'),

    # Redirect if doesn't url exit
    url(r'^.*$', RedirectView.as_view(pattern_name='home', permanent=False))
]