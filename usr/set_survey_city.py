# coding: utf8
import os
import pymongo
import geocoder
import json
import random
import time

client = pymongo.MongoClient()
db = client.epihack

query = {
    "$and": [
        {"city": {"$exists": False}},
        {"ip": {"$exists": True}}
    ]
}

API_KEYS = [
    "AIzaSyDJTn7zTOa-qz1w-Dy6zWL1tI_VCSLynG0",
    "AIzaSyD8Qj1JmzqaDgWoYbVqYV09M-GMLzpo12k"
]

surveys_cursor = db.survey.find(query)

def set_lat_long():
    total = 0
    for survey in surveys_cursor:
        time.sleep(3)
        g = geocoder.maxmind(survey['ip'])
        result = db.survey.update_one(
            {
                "_id": survey['_id']
            },
            {
                "$set": {
                    "city": g.city
                }
            }
        )
        total += 1

    print("Total de survey atualizadas {total}".format(total=total))

if __name__ == "__main__":
    set_lat_long()
