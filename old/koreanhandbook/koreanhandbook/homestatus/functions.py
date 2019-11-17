def validInputData(method, key, temp_value, humidity_value, date):
    if(method != None and key != None and temp_value != None and humidity_value != None and date != None): 
        return True
    else:
        return False