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
from .api import *

def home(request):
    info = Info.objects.all()
    tools = Tool.objects.all()
    page_title = generate_page_title('Info')
    if len(info) == 0:
        status = 'No information available'
    else: 
        status = ''
    description = 'The Korean Handbook is a collection of Korean language learning tools and information.'
    
    render_content = {
        'page_title': page_title,
        'status': status,
        'description': description,
        'info': info,
        'tools': tools,
        'additionalAds': []
    }

    return render(request, 'home.html', render_content)

def about(request):
    return render(request, 'about.html')

def tool(request, tool_name):
    try:
        tools = Tool.objects.all()
        tool = Tool.objects.get(url=tool_name)
        title = tool.full_name + ' ' + tool.korean_name
        page_title = generate_page_title(title)
        description = tool.full_name + ' - ' + tool.korean_name + ': ' + tool.description
        related_content = generate_related_content(Info, 2, -1)

        render_content = {
            'page_title': page_title,
            'tool': tool,
            'related_content': related_content,
            'description': description,
            'tools': tools,
        }

        if(tool_name in ['random-korean-words', 'quiz']):
            info = Info.objects.all()
            for info_page in info:
                if(len(info_page.full_name)):
                    info_page.short_name = info_page.full_name
            render_content['info'] = info

            return render(request, tool_name + '.html', render_content)
        else:
            return render(request, tool_name + '.html', render_content)
    except Tool.DoesNotExist:
        return redirect ('/')

def info(request, info_name):
    tools = Tool.objects.all()
    try:
        info = Info.objects.get(short_name=info_name)
        title = info.full_name + ' ' + info.korean_name
        page_title = generate_page_title(title)
    except Info.DoesNotExist:
        return redirect ('/')
    info_rows = None
    if info.num_colums == 2:
        if info.numeric_first_col == True:
            if info.alphanumeric_order == True:
                info_rows = cast_as_int(Row_2.objects.filter(info=info).order_by('col_1'), 'col_1', 'col_1_numeric')
            else:
                info_rows = cast_as_int(Row_2.objects.filter(info=info), 'col_1', 'col_1_numeric')
        else:
            if info.alphanumeric_order == True:
                info_rows = Row_2.objects.filter(info=info).order_by('col_1')
            else:
                info_rows = Row_2.objects.filter(info=info).order_by('date_inserted')
        description = info.full_name + ' - ' + info.korean_name + ': ' + info.description
        related_content = generate_related_content(Info, 2, info.id)
        render_content = {
            'info': info,
            'rows': info_rows,
            'related_content': related_content,
            'page_title': page_title,
            'description': description,
            'tools': tools
        }

        return render(request, 'info_table_row_2.html', render_content)
    elif info.num_colums == 3:
        if info.numeric_first_col == True:
            if info.alphanumeric_order == True:
                info_rows = cast_as_int(Row_3.objects.filter(info=info).order_by('col_1'), 'col_1', 'col_1_numeric')
            else:
                info_rows = cast_as_int(Row_3.objects.filter(info=info), 'col_1', 'col_1_numeric')
        else:
            if info.alphanumeric_order == True:
                info_rows = Row_3.objects.filter(info=info).order_by('col_1')
            else:
                info_rows = Row_3.objects.filter(info=info).order_by('date_inserted')
        description = info.full_name + ' - ' + info.korean_name + ': ' + info.description 
        related_content = generate_related_content(Info, 2, info.id)
        render_content = {
            'info': info,
            'rows': info_rows,
            'related_content': related_content,
            'page_title': page_title,
            'description': description,
            'tools': tools
        }

        return render(request, 'info_table_row_3.html', render_content)
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
            filtered_tools = find_matching_info(tools, search_text)
            filtered_info = find_matching_info(infos, search_text)

            page_title = generate_page_title('Search')
            search_results = filtered_tools + filtered_info
            for result in search_results:
                result.type = get_model_name(result)
            result_count = len(search_results)
            if result_count > 1:
                search_results.sort(key=lambda obj: obj.search_score)
                search_results = reversed(search_results)
                status = 'Found ' + str(result_count) + ' results'
            elif result_count > 0:
                status = 'Found ' + str(result_count) + ' result'
            else:
                status = 'No information matched the search criteria'

            render_content = {
                'page_title': page_title,
                'status': status,
                'search_results': search_results,
                'tools': tools
            }

            return render(request, 'search.html', render_content)
    else:
        return redirect ('/')

def api_random_word(request):
    user_url = request.META['HTTP_HOST']
    if check_valid_domain(user_url):  
        content = request.GET.get('content', None)
        num_of_words = request.GET.get('quantity', None)

        if content == None:
            content = 'random'
        if num_of_words == None:
            num_of_words = 1
        else:
            num_of_words = int(num_of_words)
        if num_of_words > 0 and num_of_words <= 10:
            json_response = get_random_words(content, num_of_words)
            return JsonResponse(json_response)
        else:
            return JsonResponse({'error': 'Only request between 1 to 10 words'})
    else:
        return JsonResponse({'error': 'Invalid domain, api only works on same origin url'})

def api_get_content_names(request):
    user_url = request.META['HTTP_HOST']
    if check_valid_domain(user_url):  
        info_name_list = get_content_names()
        json_response = {}
        json_response['content_names'] = info_name_list
        return JsonResponse(json_response)
    else:
        return JsonResponse({'error': 'Invalid domain, api only works on same origin url'})