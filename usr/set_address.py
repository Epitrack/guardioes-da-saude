# coding: utf8
import os
import pymongo
import geocoder
import json

client = pymongo.MongoClient()
db = client.epihack

query = {"geoByIP": True}

surveys_cursor = db.survey.find(query)

def set_lat_long():
    total = 0
    for survey in surveys_cursor:
        ip = survey.get("ip")
        if ip is not None:
            g = geocoder.ip(ip)
            address = geocoder.google([survey["lat"], survey["lon"]], method='reverse')
            ajson = json.loads(json.dumps(address.json))
            print(survey["_id"])
            result = db.survey.update_one(
                {
                    "_id": survey["_id"]
                },
                {
                    "$set": {
                        "formattedAddress": ajson["city"],
                        "city": ajson["city"],
                        "state": ajson["state"],
                    }
                }
            )
            total += result.matched_count
    print("Total de survey atualizadas {total}".format(total=total))

if __name__ == "__main__":
    set_lat_long()
