# Standard library imports
from random import randint
from django.db.models import Max
import random

# Local app imports
from .models import *
from .firebase import *

valid_urls = ['127.0.0.1', 'thekoreanhandbook.com']
valid_search_score_level = 0.7

# Return list of related content 
def generate_related_content(model, num_of_content, current_id):
    max_id = model.objects.all().aggregate(max_id=Max("id"))['max_id']
    related_content = []
    for content in range(0, num_of_content):
        related_content.append(get_related_content(model, max_id, related_content))
    return related_content

# Loop through model objects to find object that doesn't current exist in the related content
def get_related_content(model, max_id, current_related_content):
    while True:
        index = randint(1, max_id)
        related_content = model.objects.filter(pk=index).first()
        if related_content and related_content not in current_related_content:
            return related_content

# Get search score based on the number of substrings existing between the two strings
def search_string(match_string, search_string):
    match_sub_string = get_all_substrings(match_string.lower())
    search_string = search_string.lower()
    search_score = 0
    for sub_string in match_sub_string:
        if sub_string in search_string:
            search_score += 1
    return search_score
    
def get_all_substrings(string):
    length = len(string)
    for i in range(length):
        for j in range(i + 1, length + 1):
            yield(string[i:j]) 

def cast_as_int(query_set, int_column, new_column):
    return query_set.extra(
        select={new_column: 'CAST(' + int_column + ' AS INTEGER)'}
    ).order_by(new_column)

def find_matching_info(info_array, search_text):
    filtered_array = []
    for info in info_array:
        info_search_score_eng = search_string(info.full_name, search_text)
        info_search_score_kor = search_string(info.korean_name, search_text)
        if check_score(info_search_score_eng, search_text) or check_score(info_search_score_kor, search_text):
            if (info_search_score_eng > info_search_score_kor):
                info.search_score = info_search_score_eng
            else:
                info.search_score = info_search_score_kor
            filtered_array.append(info)   
        else:
            info.search_score = 0
    return filtered_array

def check_score(score, search_text):
    return score >= (len(search_text)*valid_search_score_level)

def get_model_name(object):
    return object.__class__.__name__.lower() 

def generate_page_title(page_name):
    return page_name + ' - The Korean Handbook'

def is_divisble(num_1, num_2):
   return (num_1 % num_2) == 0

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

# Check if url is whitelisted
def check_valid_domain(user_url):
    for url in valid_urls:
        if (url in user_url):
            return True
    return False