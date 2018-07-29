# Standard library imports
from random import randint
from django.db.models import Max
import random

# Local app imports
from .models import *
import pyrebase

firebase_config = {
  "apiKey": "AIzaSyDpdCyIU1xaKISrFtnjBN52xKwoisFQN1Q",
  "authDomain": "korean-words-2.firebaseapp.com",
  "databaseURL": "https://korean-words-2.firebaseio.com",
  "storageBucket": "korean-words-2.appspot.com",
}

firebase = pyrebase.initialize_app(firebase_config)
firebase_db = firebase.database()
firebase_word_count = firebase_db.child("wordCount").get().val()

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

def isDivisble(num1, num2):
   return (num1 % num2) == 0

def genWordIndices(db_length, num_of_words):
    return  random.sample(range(0, db_length), num_of_words)

def getRandomWords(content, num_of_words):
    json_response = {}
    words = []
    if(content in ['random', None]):
        selected_words = genWordIndices(firebase_word_count, num_of_words)
        for word_count in range(0, num_of_words):
            word_key = selected_words[word_count]
            word = {}
            db_word = firebase_db.child(word_key).get().val()
            word['english']  = db_word['ENGLISH']
            word['korean'] = db_word['KOREAN']
            words.append(word)
        json_response['num_Words'] = 5666
        json_response['words'] = words
        return json_response
    else: 
        try:
            info = Info.objects.get(short_name=content)
            if info.num_colums == 2:
                db_words = Row_2.objects.filter(info=info)
            else:
                db_words = Row_3.objects.filter(info=info)
            db_num_words = len(db_words)
            if(db_num_words > 0):
                if(db_num_words < 3):
                    selected_words = [0]
                    num_of_words = 1
                else:
                    selected_words = genWordIndices(db_num_words, num_of_words)
                for word_count in range(0, num_of_words):
                    word = {}
                    word_key = selected_words[word_count]
                    db_word = db_words[word_key]
                    word['wordKey'] = word_key
                    word['english'] = db_word.col_1
                    word['korean'] = db_word.col_2 
                    words.append(word)
                json_response['num_words'] = db_num_words
                json_response['words'] = words
                return json_response
            else:
                return {'error': 'Invalid content'}
        except Info.DoesNotExist:
            return {'error': 'Invalid content'}