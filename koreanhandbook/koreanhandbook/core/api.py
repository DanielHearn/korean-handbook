# Django imports
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.http import JsonResponse
from datetime import datetime
import random

# Local app imports
from .models import *
from .firebase import *

def gen_word_indices(db_length, num_of_words):
    return  random.sample(range(0, db_length), num_of_words)

def get_random_words(content, num_of_words):
    json_response = {}
    words = []

    if(content in ['random', None]):
        # If random content use firebase databa se

        selected_words = gen_word_indices(get_random_word_count(), num_of_words)
        for word_count in range(0, num_of_words):
            word_key = selected_words[word_count]
            word = {}
            db_word = get_random_word(word_key)
            word['english']  = db_word['ENGLISH']
            word['korean'] = db_word['KOREAN']
            words.append(word)
        json_response['num_Words'] = 5666
        json_response['words'] = words
        return json_response
    else: 
        # Get data from aws database

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
                    selected_words = gen_word_indices(db_num_words, num_of_words)
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