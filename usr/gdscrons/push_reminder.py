# -*- coding: utf-8 -*-
import jinja2
import os
import pymongo
from datetime import datetime, date, timedelta
import threading

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True
)

client = pymongo.MongoClient()
db = client.epihack
date_delta = datetime.now() - timedelta(days=10)
users_cursor = db.user.find({'lastSurvey': {'$lte': date_delta}})

def send_push():
    pass

def send_reminder():

    LANGS = {
     'Brazil': 'pt_BR',
     'Russia': 'ru',
     'France': 'fr',
     'China': 'ch',
     'Spain': 'es',
     'Mexico': 'es',
     'Argentina': 'es',
     'Colombia': 'es',
     'Peru': 'es',
     'Chile': 'es',
     'Ecuador': 'es',
     'Uruguay': 'es',
     'Portugal': 'pt_BR',
     'Venezuela': 'es',
     'Paraguay': 'es',
     'Bolivia': 'es',
     'Cuba': 'es'
    }
    total = 0
    for user in users_cursor:
        country = user.get('country', 'Brazil')
        lang = LANGS.get(country, 'en')
        template_name = 'email_reminder_{lang}.html'.format(lang=lang)
        template = env.get_template(template_name)
        html_body = template.render()
        send_push() #thread
        total +=1
    print('Total de PUSHIES enviados {total}'.format(total=total))


if __name__ == "__main__":
    send_remider()
