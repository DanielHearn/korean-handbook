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
                #set in db
                temp_row = Temperature(temp_value=floatTemp, date_inserted=datetime.now())
                temp_row.save()
                print(temp_row.id)
                print(temp_row.temp_value)
                return HttpResponse("Added Status with " + str(floatTemp) + "c")
            else:
                return HttpResponse("Error: Enter a valid number")
        return HttpResponse("Couldn't add status")
    else:
        #if a last status exists

        #else render with no status

        #render view with last status
        print(len( Temperature.objects.all()))
        latest_temp = Temperature.objects.last()

        if hasattr(latest_temp, 'temp_value'):
            temp = str(latest_temp.temp_value)
            date_inserted = latest_temp.date_inserted
            date_string = str(date_inserted.month)+ "/" + str(date_inserted.day) + "/" + str(date_inserted.year) + " - " + str(date_inserted.hour) + ":" + str(date_inserted.minute)
            return HttpResponse("Last temperature: " + temp + "c, Added on: " + date_string)
        else:
            return HttpResponse("No available statuses")