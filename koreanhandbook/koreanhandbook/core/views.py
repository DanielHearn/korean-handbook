# Django imports
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect

# Local app imports
from .forms import *
from .models import *
from .functions import *
from datetime import datetime

class Ad:
    def __init__(self):
        self.ad = True

def home(request):
    tools = Tool.objects.all()
    info = Info.objects.all()
    status = ''
    if len(tools) and len(info) == 0:
        status = 'No tools or information available'
    focusInfo = info.filter(home_focus=True)
    focusTools = tools.filter(home_focus=True)
    if (len(focusInfo) > 0 or len(focusTools)):
        sliderVisible = True
    else:
        sliderVisible = False
    tools = addAdToArray(tools, 4)
    info = addAdToArray(info, 4) 
    return render(request, 'home.html', {'status': status, 'sliderVisible': sliderVisible, 'focusInfo': focusInfo, 'focusTools': focusTools, 'tools': tools, 'info': info})

def about(request):
    return render(request, 'about.html')

def kpopprofiles(request):
    profiles = Profile.objects.all()
    status = ''
    if len(profiles) == 0:
        status = 'No profiles available'
    focusProfiles = profiles.filter(home_focus=True)
    if (len(focusProfiles) > 0):
        sliderVisible = True
    else:
        sliderVisible = False
    profiles = addAdToArray(profiles, 4)
    return render(request, 'kpopprofiles.html', {'status': status, 'sliderVisible': sliderVisible, 'profiles': profiles, 'focusProfiles': focusProfiles})

def kpopprofile(request, profile_name):
    profile_name = profile_name[0:len(profile_name)-1]
    profile = Profile.objects.get(short_name=profile_name)
    members = Member.objects.filter(profile=profile).order_by('birth_date')
    profiles = addAdToArray(members, 2)
    return render(request, 'kpopprofile.html', {'profile': profile, 'members': members})

def tool(request, tool_name):
    tool_name = tool_name[0:len(tool_name)-1]
    return render(request, tool_name + '.html')

def info(request, info_name):
    info_name = info_name[0:len(info_name)-1]
    info = Info.objects.get(short_name=info_name)
    info_rows = ''
    if info.num_colums == 2:
        if info.numeric_first_col == True:
            if info.alphanumeric_order == True:
                info_rows = castAsInt(Row_2.objects.filter(info=info).order_by('col_1'), 'col_1', 'col_1_numeric')
            else:
                info_rows = castAsInt(Row_2.objects.filter(info=info), 'col_1', 'col_1_numeric')
        else:
            if info.alphanumeric_order == True:
                info_rows = Row_2.objects.filter(info=info).order_by('col_1')
            else:
                info_rows = Row_2.objects.filter(info=info).order_by('date_inserted')
        return render(request, 'info_table_row_2.html', {'info': info, 'rows': info_rows})
    elif info.num_colums == 3:
        if info.numeric_first_col == True:
            if info.alphanumeric_order == True:
                info_rows = castAsInt(Row_3.objects.filter(info=info).order_by('col_1'), 'col_1', 'col_1_numeric')
            else:
                info_rows = castAsInt(Row_3.objects.filter(info=info), 'col_1', 'col_1_numeric')
        else:
            if info.alphanumeric_order == True:
                info_rows = Row_3.objects.filter(info=info).order_by('col_1')
            else:
                info_rows = Row_3.objects.filter(info=info).order_by('date_inserted')
        return render(request, 'info_table_row_3.html', {'info': info, 'rows': info_rows})
    else:
        return redirect ('/')

def search(request):
    if request.method == 'GET':
        form = SearchForm(request.GET)
        if form.is_valid():
            searchText = form.cleaned_data.get('search_text')
            if len(searchText) == 0:
                return redirect ('/')
            tools = Tool.objects.all()
            infos = Info.objects.all()
            kpopprofiles = Profile.objects.all()
            filteredTools = findMatchingInfo(tools, searchText)
            filteredInfo = findMatchingInfo(infos, searchText)
            filteredProfiles = findMatchingInfo(kpopprofiles, searchText)
            filteredTools = addAdToArray(filteredTools, 4)
            filteredInfo = addAdToArray(filteredInfo, 4)
            filteredProfiles = addAdToArray(filteredProfile, 4)
            if len(filteredProfiles) == 0 and len(filteredInfo) == 0 and len(filteredTools) == 0:
                status = 'No information matched the search criteria'
            else :
                status = ''
            return render(request, 'search.html', {'status': status, 'tools': filteredTools, 'info': filteredInfo, 'kpopProfiles': filteredProfiles})
    return redirect ('/')
