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

def castAsInt(querySet, intColumn, newColumn):
    return querySet.extra(
        select={newColumn: 'CAST(' + intColumn + ' AS INTEGER)'}
    ).order_by(newColumn)
