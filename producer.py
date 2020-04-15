from time import sleep
from json import dumps
from kafka import KafkaProducer

class Connection:

    def send(self, filename):
        filee = open(filename)
        for x in filee:
            info = x.split(",");
            data = {"id": info[0], "info_1": info[1], "info_2": info[2],
                    "info_3": info[3], "info_4": info[4], "info_5": info[5], "info_6": info[6], "info_7": info[7], "info_8": info[8]}
            producer = KafkaProducer(bootstrap_servers=['localhost:9092'], value_serializer=lambda x: dumps(x).encode('utf-8'))
            producer.send('numtest', value=data)
            sleep(5)

a = Connection()
a.send("dados_bus.csv")
