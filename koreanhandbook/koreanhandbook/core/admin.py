# Django imports
from django.contrib import admin

# Local app imports
from .models import *

class Row2InLine(admin.TabularInline):
    model = Row_2

class Row3InLine(admin.TabularInline):
    model = Row_3

class InfoAdmin(admin.ModelAdmin):
    actions_on_bottom = False
    actions_on_top = True
    inlines = [
        Row2InLine,
        Row3InLine,
    ]

admin.site.register(Tool)
admin.site.register(Info, InfoAdmin)
admin.site.register(Row_2)
admin.site.register(Row_3)
