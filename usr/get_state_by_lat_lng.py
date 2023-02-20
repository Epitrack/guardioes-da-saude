# coding: utf8
import os
import pymongo
import geocoder
import json
import time
import random

client = pymongo.MongoClient()
db = client.epihack

query = {
     "$and": [
        {"lat":{"$ne": 0}},
        {"lon":{"$ne": 0}},
        {"state": None},
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
        if survey["lat"] != 0 and survey["lon"] != 0:
            print(survey["_id"])
            time.sleep(3)
            address = geocoder.google([survey["lat"], survey["lon"]], method='reverse', key=API_KEYS[random.randint(0,1)])
            ajson = json.loads(json.dumps(address.json))
            if address:
                result = db.survey.update_one(
                    {
                    "_id": survey['_id']
                    },
                    {
                        "$set": {
                            "formattedAddress": ajson.get("address", None),
                            "city": ajson.get("city", None),
                            "state": ajson.get("state", None),
                        }
                    }
                )
                total += result.matched_count
    print("Total de survey atualizadas {total}".format(total=total))


if __name__ == "__main__":
    set_lat_long()
