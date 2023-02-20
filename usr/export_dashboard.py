#!/usr/bin/python
# encoding: utf-8
from pymongo import MongoClient
from collections import Counter
from datetime import date
from datetime import datetime
import pymongo
import csv
import geocoder
from bson.objectid import ObjectId
import random
import time
import sys

client = MongoClient()
db = client.epihack
query = {'createdAt': {'$gte': datetime(2016,3,28)}}
surveys_cursor = list(db.survey.find(query).sort("createdAt", pymongo.ASCENDING))

def get_total_surveys_by_user(user_id):
    total = db.survey.find({'user': user_id }).count()
    return total

def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def get_survey_seq(user_list, user_id):
    return user_list.count(user_id)

def get_total_members(user_id):
    total = db.household.find({'user': user_id }).count()
    return total

def get_dofs(user_id):
    """
       returns  `dofs` date of first survey
    """
    dofs = db.survey.find({'user': user_id })[0]
    return dofs

def is_household(survey):
    household = survey.get('household', None)
    if household:
        return "SECUNDARIO"
    return "PRINCIPAL"

def export():
    db.ei_syndrome.remove({})
    db.ei_symptoms.remove({})
    user_list = []
    symptoms_list = ["febre","dor-nas-juntas","dor-de-cabeca",
                    "coceira","olhos-vermelhos","sangramento",
                    "nausea-vomito","dor-de-garganta",
                    "falta-de-ar","manchas-vermelhas",
                    "dor-no-corpo","tosse","diarreia"]
    x = 0
    total = len(surveys_cursor)
    syndrome_list = []
    symptom_list = []
    for doc in surveys_cursor:
        sindrome = "Nenhuma sindrome"
        user = db.user.find_one({'_id': doc['user'] })
        if user:
            try:
                total_surveys = get_total_surveys_by_user(user['_id'])
                total_members = get_total_members(user['_id'])
                dofs = get_dofs(user['_id'])['createdAt'].date()
                seq = user_list.count(str(user['_id']))
                user_list.append(str(user['_id']))
                nick = user['nick'].encode('utf-8').strip()
                email = user['email'].encode('utf-8').strip()

                try:
                    addres = doc['formattedAddress'].encode('utf-8').strip()
                except UnicodeEncodeError as e:
                    addres = doc['formattedAddress']
                except:
                    addres = 'Address not found'
                try:
                    state = doc['state'].encode('utf-8').strip()
                except:
                    state = 'State not found'

                febre = doc.get('febre', "N")
                dor_nas_juntas = doc.get('dor-nas-juntas', "N")
                dor_de_cabeca = doc.get('dor-de-cabeca', "N")
                coceira = doc.get('coceira', "N")
                olhos_vermelhos = doc.get('olhos-vermelhos', "N")
                sangramento = doc.get('sangramento', "N")
                nausea_vomito = doc.get('nausea-vomito', "N")
                dor_de_garganta = doc.get('dor-de-garganta', "N")
                falta_de_ar = doc.get('falta-de-ar', "N")
                manchas_vermelhas = doc.get('manchas-vermelhas', "N")
                dor_no_corpo = doc.get('dor-no-corpo', "N")
                tosse = doc.get('tosse', "N")
                diarreia = doc.get('diarreia', "N")

                """
                Regras para sindromes
                - Síndrome exantemática (quando o usuário selecionar essa conjugação dos sintomas, ele deverá ser alertado na tela com a mensagem do Zika):
                  - Manchas Vermelhas (variável obrigatória) E (pelo menos mais UM desses sintomas abaixo):
                      - Febre OU
                      - Dores no corpo OU
                      - Dor nas juntas OU
                      - Dor de cabeça OU
                      - Coceira OU
                      - Olhos vermelhos OU
                      - Sangramento
              - Síndrome diarreica
                  - Febre E Náusea/Vômito E diarréia (tres variáveis obrigatórias) e, pelo menos mais UM dos sintomas:
                      - Dores no Corpo OU
                      - Dor de cabeça
              - Síndrome respiratória
                  - Febre E Tosse (duas variáveis obrigatórias) e pelo menos UM dos sintomas:
                      - Dor de garganta OU
                      - Falta de Ar
                """

                exantematica = manchas_vermelhas == "Y" and (febre == "Y" or dor_no_corpo == "Y" or dor_de_cabeca == "Y"\
                or coceira == "Y" or olhos_vermelhos == "Y" or sangramento == "Y" or dor_nas_juntas == "Y")

                diarreica = (febre == "Y" and nausea_vomito == "Y") and dor_no_corpo == "Y" or dor_de_cabeca == "Y"

                respiratoria = (febre == "Y" and tosse == "Y") or dor_de_garganta == "Y" or falta_de_ar == "Y"

                survey_symptoms = [k[0] for k in doc.items() if k[0] in symptoms_list]

                # print("SINDROME 1", sindrome)
                if exantematica:
                    sindrome = "exantematica".upper()

                if diarreica:
                    sindrome = "diarreica".upper()

                if respiratoria:
                    sindrome = "respiratoria".upper()

                # print("symptoms", survey_symptoms)
                # print("is exantematica", exantematica)
                # print("is diarreica", diarreica)
                # print("is respiratoria", respiratoria)

                # print("SINDROME 2", sindrome)
                city = 0
                try:
                    if doc['city'] is not None:
                        city = doc['city']
                except KeyError as e:
                    pass
                row = [
                  doc['_id'],
                  user['_id'],
                  nick,
                  calculate_age(user['dob']),
                  user['gender'],
                  email,
                  user['race'],
                  doc['createdAt'],
                  doc['createdAt'].date(),
                  doc['createdAt'].time(),
                  addres,
                  state,
                  doc['platform'],
                  doc['lat'],
                  doc['lon'],
                  doc['no_symptom'],
                  febre,
                  manchas_vermelhas, dor_no_corpo, dor_nas_juntas,
                  dor_de_cabeca, coceira, olhos_vermelhos, dor_de_garganta, tosse, falta_de_ar,
                  nausea_vomito, diarreia, sangramento, doc.get('hadContagiousContact', False),
                  doc.get('hadHealthCare', False), dofs,
                  doc['no_symptom'], diarreica, respiratoria,
                  exantematica, int(seq + 1), total_surveys,
                  total_members, is_household(doc),
                  doc.get('hadTravelledAbroad', False),
                  doc['week_of'].strftime("%d-%m-%Y"),
                  doc['createdAt'].strftime("%m"),
                  doc['createdAt'].strftime("%Y"),
                  ",".join(survey_symptoms),
                  sindrome,
                  user['ageGroup'],
                  doc['week_of'].date().isocalendar()[1],
                  "{0}/{1}".format(doc['createdAt'].strftime("%m"),doc['createdAt'].strftime("%Y")),
                  city
                ]
                syndrome_dict = get_syndrome(row)
                symptom_dict = get_symptoms(row)
                # syndrome_list.append(syndrome_dict)
                # symptom_list.append(symptom_dict)
                db.ei_syndrome.insert(syndrome_dict)
                db.ei_symptoms.insert(symptom_dict)
                # print('SYMPTOMS',symptom_dict)
                # print('SYNDROME',syndrome_dict)
            except TypeError as e:
                raise e
            except UnicodeEncodeError as e:
                raise e
            x+=1
            percent = x*100/total
            sys.stdout.write('Imported {0}%\n'.format(percent))
            sys.stdout.flush()
    # db.ei_symptoms.insert_many(symptom_list)
    # db.ei_syndrome.insert_many(syndrome_dict)
    sys.stdout.write('==='*100)
    sys.stdout.write('Done!')
    return

def get_syndrome(row):
    _dict = {
        "user_id": str(row[1]),
        "age": row[3],
        "gender": get_gender(row[4]),
        "date_reported": datetime(
            year=row[8].year,
            month=row[8].month,
            day=row[8].day,
        ),
        "region": get_region(row[13], row[14]),
        "lat_reported": row[13],
        "lng_reported": row[14],
        "coords_reported": [row[13], row[14]],
        "needs_help": row[30],
        "date_onset": datetime(
            year=row[31].year,
            month=row[31].month,
            day=row[31].day,
        ),
        "role": get_user_role(row[1]),
        "foreigner": row[40],
        "symptoms": row[44].split(","),
        "syndrome": row[45],
        "city": get_city(row[13], row[14], row)
    }
    return _dict

def get_symptoms(row):
    _dict = {
        "city": get_city(row[13], row[14], row),
        "user_id": str(row[1]),
        "age": row[3],
        "gender": get_gender(row[4]),
        "date_reported": datetime(
            year=row[8].year,
            month=row[8].month,
            day=row[8].day,
        ),
        "region": get_region(row[13], row[14]),
        "lat_reported": row[13],
        "lng_reported": row[14],
        "coords_reported": [row[13], row[14]],
        "date_onset": datetime(
            year=row[31].year,
            month=row[31].month,
            day=row[31].day,
        ),
        "role": get_user_role(row[1]),
        "foreigner": row[40],
        "symptom": row[44].split(","),
        "sough_help": row[30]
    }
    return _dict

def get_region(lat, lng):
    query  = {'geometry': {'$geoIntersects': {'$geometry': {'type': 'Point', 'coordinates': [lng, lat]}}}}
    cur = db.geobrasil.find_one(query)
    if cur:
        return cur['properties']['GMI_ADMIN']
    return ""

def get_user_role(user_id):
    roles = {
        1:u"Atleta/Delegação",
        2:u"Trabalhador/Voluntário",
        3:u"Fã/Espectador",
        0:u"Fã/Espectador"
    }
    try:
        user = db.user.find_one({"_id": ObjectId(user_id)})
        role = user['role']
    except KeyError as e:
        role = 3
    return roles[int(role)].encode('utf-8')

def get_gender(g):
    gender = "female"
    if g == "M":
        gender = "male"
    return gender

def get_city(lat, lng, row):
    api_keys = [
        "AIzaSyDJTn7zTOa-qz1w-Dy6zWL1tI_VCSLynG0",
        "AIzaSyD8Qj1JmzqaDgWoYbVqYV09M-GMLzpo12k"
    ]
    city = row[-1]
    if city == 0 and lat != 0 and lng != 0:
        # time.sleep(3)
        # g = geocoder.google([lat, lng], method='reverse', key=api_keys[random.randint(0,1)])
        city = "Nao informada"
    return city

if __name__ == "__main__":
    export()
