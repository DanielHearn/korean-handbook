# Standard library imports

# Local app imports
from .models import *

def searchString(matchString, searchString):
    print(matchString.lower())
    if searchString.lower() in matchString.lower():
        print('MATCH!')
        return True
    else:
        return False

def castAsInt(querySet, intColumn, newColumn):
    return querySet.extra(
        select={newColumn: 'CAST(' + intColumn + ' AS INTEGER)'}
    ).order_by(newColumn)

def addAdToArray(array):
    for item in range(len(array)):
        if ((item+1) % 4 == 0):
            array[item].ad = True   
        elif (item == (len(array)-1)):
            array[item].ad = True   
        else:
            array[item].ad = False
    return array

def findMatchingInfo(infoArray, searchText):
    filteredArray = []
    print('SearchText = ' + searchText)
    for info in infoArray:
        if searchString(info.full_name, searchText):
            filteredArray.append(info)   
    return filteredArray