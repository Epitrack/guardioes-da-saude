# -*- coding: utf-8 -*-
import jinja2
import os
import pymongo
import boto
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, date, timedelta
from boto.ses import connection

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True
)

client = pymongo.MongoClient()
db = client.epihack
date_delta = datetime.now() - timedelta(days=21)
users_cursor = db.user.find({'lastSurvey': {'$lte': date_delta}})

def send_ses(fromaddr,
             subject,
             body,
             recipient,
             attachment=None,
             filename=''):
    """Send an email via the Amazon SES service.

    Example:
      send_ses('me@example.com, 'greetings', "Hi!", 'you@example.com)

    Return:
      If 'ErrorResponse' appears in the return message from SES,
      return the message, otherwise return an empty '' string.
    """
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = fromaddr
    msg['To'] = recipient
    part1 = MIMEText(body, 'html')
    msg.attach(part1)
    if attachment:
        part = MIMEApplication(attachment)
        part.add_header('Content-Disposition', 'attachment', filename=filename)
        msg.attach(part)
    conn = boto.ses.connect_to_region(
        'us-east-1',
        aws_access_key_id='AKIAJQ4NOCWSRY7OXS4Q',
        aws_secret_access_key='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')
    result = conn.send_raw_email(msg.as_string())
    return result if 'ErrorResponse' in result else ''

def send_remider():

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
        send_ses('contato@guardioesdasaude.org','Sentimos sua falta', template.render().encode( "utf-8" ), user['email'])
        total +=1
    print('Total de e-mail enviados {total}'.format(total=total))


if __name__ == "__main__":
    send_remider()
