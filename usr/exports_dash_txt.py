#!/usr/bin/python
#! coding: utf-8
from pymongo import MongoClient
from collections import Counter
from boto.s3.connection import S3Connection
from boto.s3.key import Key
from datetime import date, datetime
import pymongo
import csv
from export_surveys import get_fontloc, get_user_role, get_country

s3_conn = S3Connection()
bucket = s3_conn.get_bucket('gdsreports')
key = Key(bucket)


client = MongoClient()
db = client.epihack
query = { "$and":[{"no_symptom": "N"}, {'createdAt': {'$gte': datetime(2016,3,28)}}]}
surveys_cursor = db.survey.find(query).sort("createdAt", pymongo.ASCENDING)

csv_cells = [
    "ID_REG_SEQ",
    "ID_USUARIO",
    "APELIDO",
    "IDADE",
    "SEXO",
    "EMAIL",
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
    "SINTOMA",
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
    "SINTOMAS",
    "SINDROME",
    "FE",
    "SEN",
    "MESANO",
    "TIPOPUBLICO",
    "ORIGEM"
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

def export():
    with open('surveys_dashboard.txt', 'w') as csvfile:

        spamwriter = csv.writer(
            csvfile, delimiter=';',
            quotechar='|', quoting=csv.QUOTE_MINIMAL
        )
        spamwriter.writerow(csv_cells)
        user_list = []
        symptoms_list = ["febre","dor-nas-juntas","dor-de-cabeca",
                        "coceira","olhos-vermelhos","sangramento",
                        "nausea-vomito","dor-de-garganta",
                        "falta-de-ar","manchas-vermelhas",
                        "dor-no-corpo","tosse","diarreia"]
        for doc in surveys_cursor:
            sindrome = "Nenhuma sindrome"
            user = db.user.find_one({'_id': doc['user'] })
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

                exantematica = doc.get('exantematica', False)
                diarreica = doc.get('diarreica', False)
                respiratoria = doc.get('respiratoria', False)

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
                  get_user_role(user.get('role', 3)),
                  get_country(user['country'])
                ]
                # print("ROW", row)
                spamwriter.writerow(row)
            except TypeError:
                pass
            except UnicodeEncodeError:
                pass
        print('==='*100)
        print('Done! \nDownload report at https://s3.amazonaws.com/gdsreports/surveys_dashboard.txt')
        csvfile.close()
    key.key = 'surveys_dashboard.txt'
    key.set_contents_from_filename('./surveys_dashboard.txt')
    return

if __name__ == "__main__":
    export()
