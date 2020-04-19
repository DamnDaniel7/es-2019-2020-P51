from time import sleep
from json import dumps
from kafka import KafkaProducer
import csv

class Connection:

    def send(self, filename):
        filee = open('dados_bus.csv', 'r')
        csv_reader = csv.reader(filee, delimiter=',')
        next(csv_reader)
        for row in csv_reader:
            data = {"id": row[0], "node_id": row[1], "location_id": row[2],
                    "head": row[3], "lon": row[4], "lat": row[5], "speed": row[6], "ts": row[7], "write_time": row[8]}
            producer = KafkaProducer(bootstrap_servers=['localhost:9092'], value_serializer=lambda x: dumps(x).encode('utf-8'))
            producer.send('bus', value=data)
            print(data)
            sleep(5)

a = Connection()
a.send("dados_bus.csv")
