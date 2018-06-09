# Standard library imports

# Local app imports
from .models import *
from difflib import SequenceMatcher

def searchString(matchString, searchString):
    matchSubString = get_all_substrings(matchString.lower())
    searchString = searchString.lower()
    searchScore = 0
    for subString in matchSubString:
        if subString in searchString:
            searchScore += 1
    return searchScore
    
def get_all_substrings(string):
    length = len(string)
    for i in range(length):
        for j in range(i + 1, length + 1):
            yield(string[i:j]) 



def castAsInt(querySet, intColumn, newColumn):
    return querySet.extra(
        select={newColumn: 'CAST(' + intColumn + ' AS INTEGER)'}
    ).order_by(newColumn)

def addAdToArray(array, itemsBetweenAds):
    for item in range(len(array)):
        if ((item+1) % itemsBetweenAds == 0):
            array[item].ad = True   
        elif (item == (len(array)-1)):
            array[item].ad = True   
        else:
            array[item].ad = False
    return array

def findMatchingInfo(infoArray, searchText):
    filteredArray = []
    for info in infoArray:
        infoSearchScoreEng = searchString(info.full_name, searchText)
        infoSearchScoreKor = searchString(info.korean_name, searchText)
        if checkScore(infoSearchScoreEng, searchText) or checkScore(infoSearchScoreKor, searchText):
            if (infoSearchScoreEng > infoSearchScoreKor):
                info.searchScore = infoSearchScoreEng
            else:
                info.searchScore = infoSearchScoreKor
            filteredArray.append(info)   
        else:
            info.searchScore = 0
    return filteredArray

def checkScore(score, searchText):
    if score >= (len(searchText)*0.7):
        return True 
    else:
        return False

def getSearchScore(item):
    return item.searchScore