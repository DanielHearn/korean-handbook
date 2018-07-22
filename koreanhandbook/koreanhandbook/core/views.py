# Django imports
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.http import JsonResponse
from datetime import datetime
import random

# Local app imports
from .forms import *
from .models import *
from .functions import *
db = firebase.database()
word_count = db.child("wordCount").get().val()

class Ad:
    def __init__(self):
        self.ad = True

def home(request):
    info = Info.objects.all()
    tools = Tool.objects.all()
    status = ''
    page_title = generatePageTitle('Info')
    if len(info) == 0:
        status = 'No information available'
    info = addAdToArray(info, 5) 
    itemCount = 1 # One ad always exists after tools
    for info_page in info:
        itemCount += 1
        if info_page.ad == True:
            itemCount += 1
    itemCount += len(tools)
    whiteSpace = 3-(itemCount%3) # Work out number of empty grid items
    if whiteSpace == 3:
        additionalAds = []
    else:
        additionalAds = range(0, whiteSpace)
    description = 'The Korean Handbook is a collection of Korean language learning tools and information.'
    return render(request, 'home.html', {'page_title': page_title, 'status': status, 'description': description, 'info': info, 'tools': tools, 'additionalAds': additionalAds})

def about(request):
    return render(request, 'about.html')

def tool(request, tool_name):
    try:
        tools = Tool.objects.all()
        tool_name = tool_name[0:len(tool_name)-1]
        tool = Tool.objects.get(url=tool_name)
        title = tool.full_name + ' ' + tool.korean_name
        page_title = generatePageTitle(title)
        description = tool.full_name + ' - ' + tool.korean_name + ': ' + tool.description
        related_content = generateRelatedContent(Info, 2, -1)
        if(tool_name == 'random-korean-words'):
            info = Info.objects.all()
            for info_page in info:
                info_page.short_name = info_page.short_name.replace('-',' ').title()
            return render(request, tool_name + '.html', {'page_title': page_title, 'tool': tool, 'related_content': related_content, 'description': description, 'tools': tools, 'info': info})
        else:
            return render(request, tool_name + '.html', {'page_title': page_title, 'tool': tool, 'related_content': related_content, 'description': description, 'tools': tools})
    except Tool.DoesNotExist:
        return redirect ('/')

def infos(request):
    return redirect ('/')

def info(request, info_name):
    tools = Tool.objects.all()
    info_name = info_name[0:len(info_name)-1]
    try:
        info = Info.objects.get(short_name=info_name)
        title = info.full_name + ' ' + info.korean_name
        page_title = generatePageTitle(title)
    except Info.DoesNotExist:
        return redirect ('/')
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
        description = info.full_name + ' - ' + info.korean_name + ': ' + info.description
        related_content = generateRelatedContent(Info, 2, info.id)
        return render(request, 'info_table_row_2.html', {'info': info, 'rows': info_rows, 'related_content': related_content, 'page_title': page_title, 'description': description, 'tools': tools})
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
        description = info.full_name + ' - ' + info.korean_name + ': ' + info.description 
        related_content = generateRelatedContent(Info, 2, info.id)
        return render(request, 'info_table_row_3.html', {'info': info, 'rows': info_rows, 'related_content': related_content, 'page_title': page_title, 'description': description, 'tools': tools})
    else:
        return redirect ('/')

def search(request):
    if request.method == 'GET':
        form = SearchForm(request.GET)
        if form.is_valid():
            search_text = form.cleaned_data.get('search_text')
            if len(search_text) == 0:
                return redirect ('/')
            tools = Tool.objects.all()
            infos = Info.objects.all()
            filtered_tools = findMatchingInfo(tools, search_text)
            filtered_info = findMatchingInfo(infos, search_text)
            filtered_tools = addAdToArray(filtered_tools, 4)
            filtered_info = addAdToArray(filtered_info, 4)
            page_title = generatePageTitle('Search')
            search_results = filtered_tools + filtered_info
            for result in search_results:
                result.type = getModelName(result)
            result_count = len(search_results)
            if result_count > 1:
                search_results.sort(key=lambda obj: obj.searchScore)
                search_results = reversed(search_results)
                status = 'Found ' + str(result_count) + ' results'
            elif result_count > 0:
                status = 'Found ' + str(result_count) + ' result'
            else:
                status = 'No information matched the search criteria'
            return render(request, 'search.html', {'page_title': page_title, 'status': status, 'search_results': search_results, 'tools': tools})
    else:
        return redirect ('/')

def apiRandomWord(request):
    content = request.GET.get('content', None)
    if(content == 'random'):
        word_key = random.randint(0, word_count)
        word = db.child(word_key).get().val()
        english = word['ENGLISH']
        korean = word['KOREAN']
    else: 
        try:
            info = Info.objects.get(short_name=content)
            if info.num_colums == 2:
                words = Row_2.objects.filter(info=info)
            else:
                words = Row_3.objects.filter(info=info)
            if(len(words) > 0):
                index = random.randint(0, len(words)-1)
                word = words[index]
                english = word.col_1
                korean = word.col_2 
            else:
                english = 'Content doesn\'t exist'
                korean = ''
        except Info.DoesNotExist:
            english = 'Invalid Content'
            korean = ''
    return JsonResponse({'english': english, 'korean': korean})

"""
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
    profiles = profiles.order_by('date_inserted').reverse()
    profiles = addAdToArray(profiles, 3)
    return render(request, 'kpopprofiles.html', {'status': status, 'sliderVisible': sliderVisible, 'profiles': profiles, 'focusProfiles': focusProfiles})

def kpopprofile(request, profile_name):
    profile_name = profile_name[0:len(profile_name)-1]
    profile = Profile.objects.get(short_name=profile_name)
    members = Member.objects.filter(profile=profile).order_by('birth_date')
    members = addAdToArray(members, 2)
    relatedContent = generateRelatedContent(Profile, 2)
    return render(request, 'kpopprofile.html', {'profile': profile, 'members': members, 'relatedContent': relatedContent})
"""