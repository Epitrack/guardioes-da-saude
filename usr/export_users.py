#!/usr/bin/python
#! coding: utf-8
from pymongo import MongoClient
from collections import Counter
from boto.s3.connection import S3Connection
from boto.s3.key import Key
from datetime import date, datetime
from bson.objectid import ObjectId
import pymongo
import csv

s3_conn = S3Connection()
bucket = s3_conn.get_bucket('gdsreports')
key = Key(bucket)


client = MongoClient()
db = client.epihack
users_cursor = db.user.find({'createdAt': {'$gte': datetime(2016,3,28)}}).sort("createdAt", pymongo.ASCENDING)

csv_cells = [
    "ID_USUARIO",
    "IDADE",
    "SEXO",
    "COR",
    "DT_CADASTRO",
    "DT_REGISTRO_DIA",
    "DT_REGISTRO_HORA",
    "LOC_REGISTRO",
    "REGIAO",
    "EQUIPAMENTO",
    "LAT",
    "LONG",
    "DT_ULT_PART",
    "TOTPART",
    "TOTALSEC",
    "SE",
    "MES",
    "ANO"
]
def get_total_members(user_id):
    total = db.household.find({'user': user_id }).count()
    return total

def get_total_surveys_by_user(user_id):
    total = db.survey.find({'user': user_id }).count()
    return total

def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def get_dlfs(user_id):
    """
       returns  `dofs` date of last survey
    """
    try:
        dols = db.survey.find({'user': ObjectId(user_id)})[0]
        return dols['createdAt']
    except IndexError:
        return None

def get_latlong(user_id):
    """
       returns  `dofs` date of last survey
    """
    try:
        last_survey = db.survey.find({'user': ObjectId(user_id)})[0]
        return last_survey
    except IndexError:
        return dict()


def export():
    with open('users_report.csv', 'w') as csvfile:
        spamwriter = csv.writer(
            csvfile, delimiter=';',
            quotechar='|', quoting=csv.QUOTE_MINIMAL
        )
        spamwriter.writerow(csv_cells)
        user_list = []
        for doc in users_cursor:
            try:
                dofs = get_dlfs(doc['_id'])
                email = doc['email'].encode('utf-8').strip()
                try:
                    addres = doc['formattedAddress'].encode('utf-8').strip()
                except:
                    addres = 'Address not found'
                try:
                    state = doc['state'].encode('utf-8').strip()
                except:
                    state = 'State not found'
                # print(get_dlfs(doc['_id'])['createdAt'].date())
                row = [
                        doc['_id'],
                        calculate_age(doc['dob']),
                        doc['gender'],
                        doc['race'],
                        doc['createdAt'],
                        doc['createdAt'].date(),
                        doc['createdAt'].time(),
                        addres,
                        state,
                        doc['platform'],
                        get_latlong(doc['_id']).get('lat', None),
                        get_latlong(doc['_id']).get('lon', None),
                        dofs,
                        get_total_surveys_by_user(doc['_id']),
                        get_total_members(doc['_id']),
                        doc['createdAt'].isocalendar()[1],
                        doc['createdAt'].strftime("%m"),
                        doc['createdAt'].strftime("%Y"),
                        ]
                spamwriter.writerow(row)
            except Exception as e:
                print(e)
                pass
        print('==='*100)
        print('Done! \nDownload report at https://s3.amazonaws.com/gdsreports/users_report.csv')
        csvfile.close()
    key.key = 'users_report.csv'
    key.set_contents_from_filename('./users_report.csv')

    return

if __name__ == "__main__":
    export()
