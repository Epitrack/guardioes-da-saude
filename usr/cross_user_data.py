# coding: utf8
import os
import pymongo
import geocoder
import json
import sys
from datetime import datetime
import re
import pytz
client = pymongo.MongoClient()
db = client.epihack
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 1 - pegar os usuáros que estão com estado null ou sem o field - OK
# 2 - abrir log para leitura - OK
# 3 - pegar a hora de cadastro e converter para utc -3 - OK
# 4 - tranformar a data no formato do log strftime('[%d/%b/%Y%H:%M:%S -0300]')s - OK
# 5 - procurar o padrão de data igual a data de cadastro do user - OK
# 6 - pegar o ip no log - OK
# 7 - pegar a lat e long do IP - OK
# 8 - salvar o state no obj user do banco -OK

query = {
    "$or": [{"state": None}, {"state":{"$exists": False} }]
}
users_cursor = db.user.find(query)

def set_state_from_log():
    with open(os.path.join(BASE_DIR, 'var/log/user_create.log'), 'r') as log_user_file:
        lines = log_user_file.readlines();
        for user in users_cursor:
            born_date = utc_to_local(user.get('createdAt'))
            fborn_date = born_date.strftime(r'([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(\d{1,3}\.){3}\d{1,3} - - \[%d/%b/%Y:%H:%M:%S -0300\]')
            pattern = re.compile(fborn_date)
            m = pattern.search(str(lines))
            if m:
                ip = m.group(0).split(' ')[0]
                date_log = m.group(0).split(' ')[3]
                lat_lng = geocoder.ip(ip)
                if lat_lng.lat and lat_lng.lng:
                    address = geocoder.google([lat_lng.lat, lat_lng.lng], method='reverse')
                    db.user.update_one(
                        {"_id": user["_id"]},
                        {
                            "$set": {
                                "state": address.state,
                                "updatedAt": datetime.now(),
                                "updateByLogInfo": True,
                                "dateInNginxLog": date_log
                            }
                        }
                    )
    log_user_file.close()
    return

def utc_to_local(utc_dt):
    local_tz = pytz.timezone('America/Recife')
    local_dt = utc_dt.replace(tzinfo=pytz.utc).astimezone(local_tz)
    return local_tz.normalize(local_dt) # .normalize might be unnecessary

if __name__ == "__main__":
    set_state_from_log()
