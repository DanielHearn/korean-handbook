# Django imports
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

from .models import *
from .functions import *

apikey = 'ertwqe3v34'
minStatusQuantity = 1
maxStatusQuantity = 14

@csrf_exempt
def status(request):
    method = request.GET.get('method', None)
    key = request.GET.get('key', None)
    temp_value = request.GET.get('temp_value', None)
    humidity_value = request.GET.get('humidity_value', None)
    status_quantity = request.GET.get('status_quantity', None)

    if validInputData(method, key, temp_value, humidity_value):
        if method == 'set' and key == apikey:
            if len(temp_value) > 0:
                float_temp = float(temp_value)
                date = datetime.now()

                status = Status(temp_value=float_temp, humidity_value=humidity_value, date_inserted=date)
                status.save()

                return JsonResponse({'status': 'success', 'date': date})
            else:
                return JsonResponse({'status': 'error', 'msg': 'Error: Enter a set of valid parameters'})
        else:
            return JsonResponse({'status': 'error', 'msg': 'Error: Couldn\'t add status, provide correct method and api key'})
    else:
        if Status.objects.exists():
            if status_quantity != None:
                status_quantity = int(status_quantity)
                if status_quantity >= minStatusQuantity and status_quantity <= maxStatusQuantity:
                    retrieved_statuses = Status.objects.order_by("-id")[:status_quantity]
                    statuses = []
                    for status in range(0, len(retrieved_statuses)):
                        db_status = retrieved_statuses[status]
                        json_status = {}
                        json_status['date_inserted'] = db_status.date_inserted
                        json_status['temp_value'] = db_status.temp_value
                        json_status['humidity_value'] = db_status.humidity_value
                        statuses.append(json_status)
                    return JsonResponse({'status': 'success', 'statuses': statuses})
                else:
                    return JsonResponse({'status': 'error', 'msg': 'Enter a correct status quantity'})
            else:
                return JsonResponse({'status': 'error', 'msg': 'Enter a valid status quantity'})
        else:
            return JsonResponse({'status': 'error', 'msg': 'No available statuses'})