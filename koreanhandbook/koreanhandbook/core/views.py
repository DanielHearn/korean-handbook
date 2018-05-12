# Django imports
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect

# Local app imports
from .forms import *
from .models import *
from .functions import *

def home(request):
    tools = Tool.objects.all()
    info = Info.objects.all()
    tool_status = ''
    info_status = ''
    if len(tools) == 0:
        tool_status = 'No tools available'
    if len(info) == 0:
        info_status = 'No info available'
    return render(request, 'home.html', {'tool_status': tool_status, 'info_status': info_status, 'tools': tools, 'info': info})

def about(request):
    return render(request, 'about.html')

def tool(request, tool_name):
    tool_name = tool_name[0:len(tool_name)-1]
    tool = Tool.objects.get(short_name=tool_name)
    return render(request, tool_name + '.html')

def info(request, info_name):
    info_name = info_name[0:len(info_name)-1]
    info = Info.objects.get(short_name=info_name)
    if info.num_colums == 2:
        if info.alphanumeric_order == True:
            info_rows = Row_2.objects.filter(info=info).order_by('col_1')
        else:
            info_rows = Row_2.objects.filter(info=info)
        return render(request, 'info_table.html', {'info': info, 'rows': info_rows})
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
            filteredTools = []
            filteredInfo = []
            for tool in tools:
                if searchString(tool.full_name, search_text):
                    filteredTools.append(tool)
            for info in infos:
                if searchString(info.full_name, search_text):
                    filteredInfo.append(info)
            tool_status = ''
            info_status = ''
            if len(filteredTools) == 0:
                tool_status = 'No tools matched the search'
            if len(filteredInfo) == 0:
                info_status = 'No info matched the search'
            return render(request, 'home.html', {'tool_status': tool_status, 'info_status': info_status, 'tools': filteredTools, 'info': filteredInfo})
    return redirect ('/')
