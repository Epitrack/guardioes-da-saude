#!/usr/bin/python
# encoding: utf-8
import csv
import sys
from pymongo import MongoClient

client = MongoClient()
db = client.epihack

lang = sys.argv[1]
_file = sys.argv[2]

# dict cell in CSV
# row[0] = ID
# row[1] = Tema
# row[2] = Question
# row[3] = wrong ansewer
# row[4] = wrong ansewer
# row[5] = right answer
# usage ./import_questions.py pt_BR questionspt_BR.csv

db.question.remove({'lang:'lang})

with open(_file, 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=';', quotechar='"')
    for row in spamreader:
        alternatives = [
            {
              "option": row[3],
              "correct":False
            },
            {
              "option": row[4],
              "correct":False
            },
            {
              "option": row[5],
              "correct":True
            }
        ]
        question_dict = {
            "title": row[2],
            "alternatives": alternatives,
            "lang": lang
        }
        db.question.insert(question_dict)
    csvfile.close()
