#!/usr/bin/python
#! coding: utf-8
from pymongo import MongoClient
from collections import Counter
from datetime import date, datetime
import pymongo



client = MongoClient()
db = client.epihack
surveys_cursor = db.survey.find({'createdAt': {'$gte': datetime(2016,3,28)}}).sort("createdAt", pymongo.ASCENDING)


def get_ofls(user_id):
    """
       returns  `ofls` date of last survey
    """
    ofls = db.survey.find({'user': user_id })[0]
    return ofls

def export():
        user_list = []
        user_surveys_dates = {}
        total = 0
        try:
            for doc in surveys_cursor:
                user = db.user.find_one({'_id': doc['user'] })
                is_spam = False
                if user:
                    if user_surveys_dates.get(doc['user']) is not None:
                        if user_surveys_dates[doc['user']] < doc['createdAt']:
                            d1 = user_surveys_dates.get(doc['user'])
                            d2 = doc['createdAt']
                            delta = d2-d1
                            if delta.seconds <= 300:
                                is_spam = True
                            user_surveys_dates[doc['user']] = doc['createdAt']
                    else:
                        user_surveys_dates[doc['user']] = doc['createdAt']
                try:
                    total_surveys = get_total_surveys_by_user(user['_id'])
                    total_members = get_total_members(user['_id'])
                    ofls = get_ofls(user['_id'])['createdAt'].date()
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

                    # print(exantematica)
                    # print(diarreica)
                    # print(respiratoria)

                    # print(exantematica, diarreica, respiratoria)

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
                      doc.get('hadHealthCare', False), ofls,
                      doc['no_symptom'], diarreica, respiratoria,
                      exantematica, int(seq + 1), total_surveys,
                      total_members, is_household(doc),
                      doc.get('hadTravelledAbroad', False),
                      doc['week_of'].strftime("%d-%m-%Y"),
                      doc['createdAt'].strftime("%m"),
                      doc['createdAt'].strftime("%Y"),
                      is_spam
                    ]
                    spamwriter.writerow(row)
                    total +=1
                    print('is_household', is_household(doc))
                except TypeError as e:
                    db.survey.remove({'_id':doc['_id']})
                except UnicodeEncodeError as e:
                    raise e
        except KeyError as e:
            db.survey.remove({'_id':doc['_id']})
        print('==='*100)
        print('Done! \nDownload report  at https://s3.amazonaws.com/gdsreports/surveys_reports.csv')
        print('Total: {0}'.format(total))
    return

if __name__ == "__main__":
    export()
