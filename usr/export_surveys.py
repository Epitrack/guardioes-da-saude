#!/usr/bin/python
#! coding: utf-8
from pymongo import MongoClient
from collections import Counter
from boto.s3.connection import S3Connection
from boto.s3.key import Key
from datetime import date, datetime
import pymongo
import csv
import os
import pdb
ENV = os.getenv('NODE_ENV', 'dev')
from bson.objectid import ObjectId

s3_conn = S3Connection()
bucket = s3_conn.get_bucket('gdsreports')
key = Key(bucket)

client = MongoClient()
db = client.epihack
surveys_cursor = db.survey.find(
    {
        "$and": [
             {'createdAt': {'$gte': datetime(2016,3,28)}},
             {"user": {"$exists": True}}
         ]
    }
    ).sort("createdAt", pymongo.ASCENDING)
# surveys_cursor = db.survey.find({'_id': ObjectId("56f90d6a9bc35dac74cf5ba2")}).sort("createdAt", pymongo.ASCENDING)

csv_cells = [
    "ID_REG_SEQ",
    "ID_USUARIO",
    "APELIDO",
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
    "STATUS",
    "FEBRE",
    "MANVERM",
    "DORCORPO",
    "DORJUNTAS",
    "DORCABECA",
    "COCEIRA",
    "OLHOSVERM",
    "DORGARGA",
    "TOSSE",
    "FALTAAR",
    "NAUSVOM",
    "DIARREIA",
    "SANGRAME",
    "CONTATO",
    "SERVSAUDE",
    "CADASTRO",
    "SIND_DIA",
    "SIND_RES",
    "SIND_EXA",
    "NUMPART",
    "TOTPART",
    "MEMBROS",
    "TIPOUSUARIO",
    "FORAPAIS",
    "SE",
    "MES",
    "ANO",
    "SPAM",
    "FONTELOC",
    "TIPOPUBLICO",
    "ORIGEM",
    "CIDADE"
]


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

def get_yes_no_bool(value):
    if isinstance(value, tuple):
        value = value[0]
    if value:
        return "SIM"
    return "NAO"

def get_yes_no_string(value):
    if value == "Y":
        return "SIM"
    return "NAO"

def get_had_symptom(value):
    if value == "Y":
        return "BEM"
    return "MAL"

def get_fontloc(value):
    if value != "DEVICE":
        return "IP"
    return "DEVICE"

def get_user_role(role):
    roles = {
        1:u"Atleta/Delegação",
        2:u"Trabalhador/Voluntário",
        3:u"Fã/Espectador",
        0:u"Fã/Espectador"
    }
    return roles[int(role)].encode('utf-8')

def get_country(country):
    if isinstance(country, unicode):
        return country.encode('utf-8')
    return country

def export():
    symptoms_list = ["febre","dor-nas-juntas","dor-de-cabeca",
                    "coceira","olhos-vermelhos","sangramento",
                    "nausea-vomito","dor-de-garganta",
                    "falta-de-ar","manchas-vermelhas",
                    "dor-no-corpo","tosse","diarreia"]
    with open('surveys_reports_{0}.csv'.format(ENV), 'w') as csvfile:
        spamwriter = csv.writer(
            csvfile, delimiter=';',
            quotechar='|', quoting=csv.QUOTE_MINIMAL
        )
        spamwriter.writerow(csv_cells)
        user_list = []
        user_surveys_dates = {}
        total = 0
        for doc in surveys_cursor:
            survey_symptoms = [k[0] for k in doc.items() if k[0] in symptoms_list]
            user = db.user.find_one({'_id': doc['user'] })
            is_spam = False
            if user:
                if user_surveys_dates.get(doc['user']) is not None:
                    if user_surveys_dates[doc['user']] < doc['createdAt']:
                        d1 = user_surveys_dates.get(doc['user'])
                        d2 = doc['createdAt']
                        delta = d2-d1
                        if delta.seconds <= 300 or len(survey_symptoms) == 13:
                            is_spam = True
                        user_surveys_dates[doc['user']] = doc['createdAt']
                else:
                    user_surveys_dates[doc['user']] = doc['createdAt']
            try:
                total_surveys = get_total_surveys_by_user(user['_id'])
                total_members = get_total_members(user['_id'])
                dofs = get_dofs(user['_id'])['createdAt'].date()
                seq = user_list.count(str(user['_id']))
                user_list.append(str(user['_id']))
                nick = user['nick'].encode('utf-8').strip()
                email = user['email'].encode('utf-8').strip()
                try:
                    if isinstance(doc['formattedAddress'], unicode):
                        addres = doc['formattedAddress'].encode('utf-8').strip()
                    else:
                        addres = doc['formattedAddress'].strip()
                except:
                    addres = 'Address not found'
                try:
                    if isinstance(doc['state'], unicode):
                        state = doc['state'].encode('utf-8').strip()
                    else:
                        state = doc['state'].strip()
                except:
                    state = 'State not found'
                febre = doc.get('febre', "NÃO")
                dor_nas_juntas = doc.get('dor-nas-juntas', "NÃO")
                dor_de_cabeca = doc.get('dor-de-cabeca', "NÃO")
                coceira = doc.get('coceira', "NÃO")
                olhos_vermelhos = doc.get('olhos-vermelhos', "NÃO")
                sangramento = doc.get('sangramento', "NÃO")
                nausea_vomito = doc.get('nausea-vomito', "NÃO")
                dor_de_garganta = doc.get('dor-de-garganta', "NÃO")
                falta_de_ar = doc.get('falta-de-ar', "NÃO")
                manchas_vermelhas = doc.get('manchas-vermelhas', "NÃO")
                dor_no_corpo = doc.get('dor-no-corpo', "NÃO")
                tosse = doc.get('tosse', "NÃO")
                diarreia = doc.get('diarreia', "NÃO")
                IP = doc.get('geoByIP', "DEVICE")
                """
                Síndrome exantemática (quando o usuário selecionar essa conjugação dos sintomas, ele deverá ser alertado na tela com a mensagem do Zika):
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
                - Febre E - Tosse OU
                     - Dor de garganta OU
                     - Falta de Ar
                """
                exantematica = doc.get('exantematica')
                diarreica = doc.get('diarreica')
                respiratoria = doc.get('respiratoria')
                hadContagiousContact = doc.get('hadContagiousContact', False)
                hadHealthCare = doc.get('hadHealthCare', False),
                hadTravelledAbroad = doc.get('hadTravelledAbroad', False),
                no_symptom = doc['no_symptom']

                if isinstance(doc.get('city'), unicode):
                    city = doc.get('city').encode('utf-8')
                else:
                    city = doc.get('city')
                row = [
                  doc['_id'],
                  user['_id'],
                  nick,
                  calculate_age(user['dob']),
                  user['gender'],
                  user['race'],
                  user['createdAt'].strftime("%d/%m/%Y"),
                  doc['createdAt'].date(),
                  doc['createdAt'].time(),
                  addres,
                  state,
                  doc['platform'],
                  doc['lat'],
                  doc['lon'],
                  get_had_symptom(no_symptom),
                  get_yes_no_string(febre),
                  get_yes_no_string(manchas_vermelhas),
                  get_yes_no_string(dor_no_corpo),
                  get_yes_no_string(dor_nas_juntas),
                  get_yes_no_string(dor_de_cabeca),
                  get_yes_no_string(coceira),
                  get_yes_no_string(olhos_vermelhos),
                  get_yes_no_string(dor_de_garganta),
                  get_yes_no_string(tosse),
                  get_yes_no_string(falta_de_ar),
                  get_yes_no_string(nausea_vomito),
                  get_yes_no_string(diarreia),
                  get_yes_no_string(sangramento),
                  get_yes_no_bool(hadContagiousContact),
                  get_yes_no_bool(hadHealthCare),
                  dofs,
                  get_yes_no_bool(diarreica),
                  get_yes_no_bool(respiratoria),
                  get_yes_no_bool(exantematica),
                  int(seq + 1),
                  total_surveys,
                  total_members,
                  is_household(doc),
                  get_yes_no_bool(not hadTravelledAbroad),
                  doc['week_of'].isocalendar()[1],
                  doc['week_of'].strftime("%m"),
                  doc['week_of'].strftime("%Y"),
                  get_yes_no_bool(is_spam),
                  get_fontloc(IP),
                  get_user_role(user.get('role', 3)),
                  get_country(user['country']),
                  city
                ]
                total +=1
                spamwriter.writerow(row)
            except TypeError as e:
                db.survey.remove({'_id':doc['_id']})
            except UnicodeEncodeError as e:
                raise e
            except KeyError as e:
                raise e
        print('==='*100)
        print('Done! \nDownload report  at https://s3.amazonaws.com/gdsreports/surveys_reports.csv')
        print('Total: {0}'.format(total))
        csvfile.close()
        key.key = 'surveys_reports.csv'
        key.set_contents_from_filename(
            './surveys_reports_{0}.csv'.format(ENV)
        )
    return

if __name__ == "__main__":
    export()
