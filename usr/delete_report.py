#!/usr/bin/python
#! coding: utf-8
from pymongo import MongoClient
import pymongo
import csv
import os 
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

smtp = smtplib.SMTP("email-smtp.us-east-1.amazonaws.com")
smtp.starttls()
smtp.login("AKIAJMQBDXC76EE3NVBQ", "Aje5LVXY40XoH9fG7P3gz7qmXvtb9NCu7YZW7tecJq6A")
me = "contato@guardioesdasaude.org"
admins = ("mariana@epitrack.com.br", "onicio@epitrack.com.br","juliana@epitrack.com.br")

client = MongoClient()
db = client.epihack
users_cursor = db.user.find({'deleted':True}).sort("createdAt", pymongo.ASCENDING)

csv_cells = [
    "Name",
    "E-mail"
]

def export():
    with open('deleted_users.txt', 'w') as csvfile:        
        spamwriter = csv.writer(
            csvfile, delimiter=';',
            quotechar='|', quoting=csv.QUOTE_MINIMAL
        )
        spamwriter.writerow(csv_cells)
        for user in users_cursor:
            try:
              nick = user['nick'].encode('utf-8').strip()
              email = user['email'].encode('utf-8').strip()
              row = [
                nick,
                email
              ]
              spamwriter.writerow(row)
            except TypeError:
                pass
            except UnicodeEncodeError:
                pass
        print('==='*100)        
        csvfile.close()
        filename = os.path.abspath("deleted_users.txt")
        f = file(filename)
        msg = MIMEMultipart('alternative')
        body = "Deleted users GdS"
        content = MIMEText(body, 'plain')
        attachment = MIMEText(f.read())
        attachment.add_header('Content-Disposition', 'attachment', filename=filename)           
        msg.attach(attachment)
        smtp.sendmail(me, admins, msg.as_string())
        print('Done!')
    return

if __name__ == "__main__":
    export()