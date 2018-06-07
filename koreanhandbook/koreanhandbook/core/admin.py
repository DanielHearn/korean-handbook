# Django imports
from django.contrib import admin

# Local app imports
from .models import *

class Row2InLine(admin.TabularInline):
    model = Row_2
    extra = 1

class Row3InLine(admin.TabularInline):
    model = Row_3
    extra = 1

class InfoAdmin(admin.ModelAdmin):
    actions_on_bottom = False
    actions_on_top = True
    inlines = [
        Row2InLine,
        Row3InLine,
    ]

class MemberInfoInLine(admin.TabularInline):
    model = Member_Info
    extra = 1

class MemberAdmin(admin.ModelAdmin):
    actions_on_bottom = False
    actions_on_top = True
    inlines = [
        MemberInfoInLine,
    ]

class MemberInLine(admin.TabularInline):
    model = Member
    extra = 1

class ProfileAdmin(admin.ModelAdmin):
    actions_on_bottom = False
    actions_on_top = True
    inlines = [
        MemberInLine,
    ]

admin.site.register(Tool)
admin.site.register(Info, InfoAdmin)
admin.site.register(Member_Info)
admin.site.register(Member, MemberAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Row_2)
admin.site.register(Row_3)
