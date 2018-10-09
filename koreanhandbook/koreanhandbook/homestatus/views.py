# Django imports
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from datetime import datetime

from .models import *

apikey = 'ertwqe3v34'

def status(request):
    method = request.GET.get('method', None)
    key = request.GET.get('key', None)
    temp = request.GET.get('temp', None)

    if method != None and key != None and temp != None:
        if method == 'set' and key == apikey:
            if len(temp) > 0:
                floatTemp = float(temp)

                temp_row = Temperature(temp_value=floatTemp, date_inserted=datetime.now())
                temp_row.save()

                return JsonResponse({'status': 'success', 'temp': floatTemp})
            else:
                JsonResponse({'status': 'error', 'msg': 'Error: Enter a valid number'})
        else:
            JsonResponse({'status': 'error', 'msg': 'Error: Couldn\'t add status'})
    else:
        latest_temp = Temperature.objects.last()

        if hasattr(latest_temp, 'temp_value'):
            temp = str(latest_temp.temp_value)
            date_inserted = latest_temp.date_inserted
            date_string = str(date_inserted.month)+ "/" + str(date_inserted.day) + "/" + str(date_inserted.year) + " - " + str(date_inserted.hour) + ":" + str(date_inserted.minute)
            return JsonResponse({'status': 'success', 'temp': temp, 'date': date_string})
        else:
            JsonResponse({'status': 'error', 'msg': 'No available statuses'})