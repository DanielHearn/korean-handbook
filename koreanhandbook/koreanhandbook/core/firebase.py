import pyrebase

firebase_config = {
  "apiKey": "AIzaSyDpdCyIU1xaKISrFtnjBN52xKwoisFQN1Q",
  "authDomain": "korean-words-2.firebaseapp.com",
  "databaseURL": "https://korean-words-2.firebaseio.com",
  "storageBucket": "korean-words-2.appspot.com",
}

firebase = pyrebase.initialize_app(firebase_config)
firebase_db = firebase.database()

def get_random_word_count():
  return firebase_db.child("wordCount").get().val()

def get_random_word(word_key):
  return firebase_db.child(word_key).get().val()