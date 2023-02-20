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
        {"lat": 0},
        {"lon": 0}
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
        ip = survey.get("ip")
        if ip is not None:
            print(survey["_id"])
            g = geocoder.ip(ip)
            lat_lng = g.latlng
            if not lat_lng:
                g = geocoder.maxmind(ip)
                lat_lng = g.latlng
            if lat_lng:
                time.sleep(30)
                address = geocoder.google([lat_lng[0], lat_lng[1]], method='reverse', key=API_KEYS[random.randint(0,1)])
                result = db.survey.update_many(
                    {
                    "$and": [ {"user": survey["user"]}, {"lat": 0, "lon": 0}]
                    },
                    {
                        "$set": {
                            "lat": address.lat, "lon": address.lng,
                            "coordinates":[address.lng, address.lat],
                            "formattedAddress": address.city,
                            "state": address.state,
                            "geoByIP": True
                        }
                    }
                )
                total += result.matched_count
    print("Total de survey atualizadas {total}".format(total=total))

if __name__ == "__main__":
    set_lat_long()
