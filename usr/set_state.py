# coding: utf8
import os
import pymongo
import geocoder
import json
import sys
from datetime import datetime
client = pymongo.MongoClient()
db = client.epihack

query = {
    "$or": [{"state": None}, {"state":{"$exists": False} }]
}
users_cursor = db.user.find(query)
def set_lat_long():
    sys.stdout.write('Total of users without state field {0}\n'.format(users_cursor.count()))
    total_lat_lng = 0
    total_ip = 0
    for user in users_cursor:
        query_survey = {'user': user['_id']}
        survey_user_cursor = db.survey.find(query_survey)
        for survey in survey_user_cursor:
            # import pdb; pdb.set_trace()
            user_state = user.get('state', None)
            ip = survey.get('ip', None)
            if (survey['lat'] == 0 and survey['lon'] == 0) and user_state is None:
                if ip is not None:
                    lat_lng = geocoder.ip(ip)
                    address = geocoder.google([lat_lng.lat, lat_lng.lng], method='reverse')
                    db.user.update_one(
                        {"_id": survey["user"]},
                        {
                            "$set": {
                                "state": address.state,
                                "updatedAt": datetime.now()
                            }
                        }
                    )
                    total_ip +=1
            elif survey['lat'] != 0 and survey['lon'] != 0:
                address = geocoder.google([survey['lat'], survey['lon']], method='reverse')
                db.user.update_one(
                    {"_id": survey["user"]},
                    {
                        "$set": {
                            "state": address.state,
                            "updatedAt": datetime.now()
                        }
                    }
                )
                total_lat_lng += 1
            else:
                print('Usuario sem nada', survey['user'])
    print("Total de users updated by IP: {0} by LAT and LNG :{1} ".format(total_ip, total_lat_lng))

if __name__ == "__main__":
    set_lat_long()
