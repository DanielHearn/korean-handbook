# Standard library imports
from random import randint
from django.db.models import Max

# Local app imports
from .models import *

def generateRelatedContent(model, numOfContent, currentID):
    max_id = model.objects.all().aggregate(max_id=Max("id"))['max_id']
    relatedContent = []
    for content in range(numOfContent):
        relatedContent.append(getRelatedContent(model, max_id, currentID))
    return relatedContent

def getRelatedContent(model, max_id, currentID):
    while True:
        pk = randint(1, max_id)
        relatedContent = model.objects.filter(pk=pk).first()
        if relatedContent:
            return relatedContent

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

def checkScore(score, search_text):
    if score >= (len(search_text)*0.7):
        return True 
    else:
        return False

def getSearchScore(item):
    return item.searchScore

def getModelName(object):
    return object.__class__.__name__.lower() 

def generatePageTitle(page_name):
    return page_name + ' - The Korean Handbook'