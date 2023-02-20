# coding: utf8
import os
import pymongo
import geocoder
import json

client = pymongo.MongoClient()
db = client.epihack

#TODO colocar sanite+uf em uma cron
#TODO verificar a porra dos null que tem lat e long
query = {
    "$and":[
        {"lat": {"$ne": 0}},
        {"lon": {"$ne": 0}},
        {"state": {"$exists": True}},
        {"state": {"$ne": None}},
        {"state": {"$ne: ""}},
        {"$where": "this.state.length > 3"},
    ]
}
surveys_cursor = db.survey.find(query)

def set_lat_long():
    total = 0
    for survey in surveys_cursor:
        print(survey["_id"])
        address = geocoder.google([survey["lat"], survey["lon"]], method='reverse')
        ajson = json.loads(json.dumps(address.json))
        if address:
            result = db.survey.update_one(
                {
                "_id": survey['_id']
                },
                {
                    "$set": {
                        "state": ajson.get("state", None),
                    }
                }
            )
            total += result.matched_count
    print("Total de survey atualizadas {total}".format(total=total))


if __name__ == "__main__":
    set_lat_long()
