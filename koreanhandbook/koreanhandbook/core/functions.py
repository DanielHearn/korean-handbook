# Standard library imports

# Local app imports
from .models import *

def searchString(matchString, searchString):
    searchString = searchString.lower()
    matchString = matchString.lower()
    print(searchString + ' : ' + matchString)
    if searchString in matchString:
        return True
    else:
        return False
