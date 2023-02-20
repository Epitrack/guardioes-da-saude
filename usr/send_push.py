#! -*- encoding:utf-8 -*-
import sys
import json
import requests
import pymongo
import datetime
import re

gcm = "AIzaSyDPVnLM8mqTGc-yrvZgQ7o360qAnGyo9YU"
client = pymongo.MongoClient()
db = client.epihack
headers = {'Authorization': 'key={0}'.format(gcm), 'Content-Type': 'application/json'}
gcm_url = 'https://gcm-http.googleapis.com/gcm/send'
# token_de_julio = 'dqGm8IWLBuI:APA91bFZIJLDSnb0SWavLH3RwP2KkFWALzQm_ruU1Ux9w8Alo-ZD7MhEFV0piogtQuoB-GaXhokfAzRsnQFY39JYu9FZm6XkbjM8rrTKPRMeC60e9SUyNm28DNff7jpe_ueA2BAFvkXT'
#
# registration_ids = [
# 	token_de_julio,
# 	"fsqJ-T2efEA:APA91bFQXqoJXRbvM6-y__cZvmvu7gQBFhuijqoTgSLjpKQVFQnwSomi4gGv-SxaMMxS5iuReI8a6ND8uHrTB_R0qPeCBDMaBhNJA9XlxLRVoQTxopKe4uYBYKzn84GYk92fk-7omIyx",
# 	"mDrNQ_9TNjU:APA91bGMw0klqF3AjnvxiflpNdX3Ef4o5_MYjD5RvmqfoIBJF6MiEb38b6vYdU2Md-DwGLQs5FFIiHLMsQX3KoR8HFzm6ZpghOISjSM-aphgmk7wuuoxVO1XpPPVMzs_arUJL3qUV3ND",
# 	"noaDc8-IbpE:APA91bGvqd8ivcEJmoRENpZ8YWyWo2nnADCQ2NxBC2LgHsXbINvpnKU8aMHXlOHkxRfzlCgSA9tIM4E8YKbZS-AIyJGwmATaXWRooNvRzlEHaoDX8i056DRCTIaVPl-U12UNMrqQONpV",
# 	"dUdWPGJatjY:APA91bEFAYWk0iaOXjuuM2w_Xigsc_V0greSPwI5XrvbVTYhWTqQXNPM3AVvmjjjJ3qOWt0XKXuOIiLmQvG437ZUELajiHvK3fQfQxoj5g2bMszx4IYdmawDnYVr_IzIn9cjkID74BBL",
# 	"dqGm8IWLBuI:APA91bFZIJLDSnb0SWavLH3RwP2KkFWALzQm_ruU1Ux9w8Alo-ZD7MhEFV0piogtQuoB-GaXhokfAzRsnQFY39JYu9FZm6XkbjM8rrTKPRMeC60e9SUyNm28DNff7jpe_ueA2BAFvkXT",
# 	"kYDCX3Xlyf0:APA91bHcRJEoLHdVjj2UzhGrZSaOt-JJIIJzbIXan0kQQBYyt8OpW_MNHsr_EYHXVbNdKns-djW6TdZIJ7RWnFwW0h3SmmdU1GsX47L8R2RlVSHOoGhrajmB6qW_3e09zvzHFJQc98Js",
# 	"mmFSCFEbpSY:APA91bEcFuqBL7tfOZEr6FB4gd6awjvygUkPtCCA2ykGPed0pGktps0SMSwsVJz1gopfajsonjzQV5tK-1bSNmg9L2L1ZaIYFB9g6Pokd8fzVgN9vDYKTUAQH9JTlkcyP6Nj8IqawNZ6",
# 	"lwZrszPMIsY:APA91bEv5XfITabnmFoA50CZgYkmFfrXr52NlOJrEf-HXT7WbaJxFFYptrl5pB8hmv9ceTpFlgXDZXRq6spW4kxCAYQ099S0se4wslA3dS3R8VbKdmtFfJc5NirR6-lyBdOEuHuksM85",
# 	"lwIlzD8VMts:APA91bH34H3zs46aoNJdTk1e4_6fYtoIpg1oUJg-toGqjKUCEGvZnMwuZrNs5Axo3w37sZCwKpNBtT0Ac2NF1Z1ljufCRQ1evqCOPKfCHvYyJRQWwJJ8D86dsWDYg8JTwqzk9piOdCYl"
# ]

bbr_regex = re.compile('brazil', re.IGNORECASE)
projection = {'gcmTokens': 1}
query = {
	'$and': [
        {'country': {'$exists': True}},
        # {'country': {'$ne': 'Brazil'}},
        {'country': {'$regex': bbr_regex}},
		{"gcmTokens": {"$exists": True}}
    ]
}
cursor = db.user.find(query, projection)
# registration_ids = [u['gcmTokens'][-1] for u in cursor]
registration_ids = list()
for u in cursor:
	if isinstance(u['gcmTokens'], list):
		print('lista')
		registration_ids.append(u['gcmTokens'][-1])
	else:
		registration_ids.append(u['gcmTokens'])

data = {
  "notification": {
    "title": "Guardiões da Saúde.",
    "message": "Coloque a saúde do Brasil em suas mãos. Monitore seus sintomas com o Guardiões da Saúde, e encontre a UPA mais perto de você.",
    "text": "Coloque a saúde do Brasil em suas mãos. Monitore seus sintomas com o Guardiões da Saúde, e encontre a UPA mais perto de você."
  },
  "priority": "high",
  "content_available": True,
  "registration_ids": registration_ids
}
#
r = requests.post(gcm_url, headers=headers, data=json.dumps(data))
# print(r.text)
