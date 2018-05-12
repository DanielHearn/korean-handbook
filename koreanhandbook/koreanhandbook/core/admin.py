# Django imports
from django.contrib import admin

# Local app imports
from .models import *

class Row2InLine(admin.TabularInline):
    model = Row_2

class InfoAdmin(admin.ModelAdmin):
    actions_on_bottom = True
    actions_on_top = False
    inlines = [
        Row2InLine,
    ]
    
admin.site.register(Tool)
admin.site.register(Info, InfoAdmin)
admin.site.register(Row_2)
