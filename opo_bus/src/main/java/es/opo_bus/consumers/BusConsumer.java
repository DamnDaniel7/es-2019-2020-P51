package es.opo_bus.consumers;

import es.opo_bus.entities.Bus;
import es.opo_bus.entities.Location;
import es.opo_bus.repositories.BusRepository;
import es.opo_bus.repositories.LocationRepository;
import es.opo_bus.repositories.RecordsRepository;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class BusConsumer implements Runnable{

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RecordsRepository recordsRepository;

    @Autowired
    private LocationRepository locationRepository;


    @Override
    public void run() {
        Properties properties = new Properties();
        properties.put("bootstrap.servers", "localhost:9092");
        properties.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("group.id", "bus");

        KafkaConsumer kafkaConsumer = new KafkaConsumer(properties);
        kafkaConsumer.subscribe(Arrays.asList("bus"));

        try {
            while (true) {
                ConsumerRecords<String, String> records = kafkaConsumer.poll(Duration.ofSeconds(10));
                for(ConsumerRecord<String, String> record : records) {
                    System.out.println("Aqui: " + record.value());
                    JSONObject jsonpObject = new JSONObject(record.value());
                    String recordId = jsonpObject.getString("id");
                    String locationId = jsonpObject.getString("location_id");
                    String busId = jsonpObject.getString("node_id");

                    Bus bus = new Bus(busId);
                    //System.out.println(busRepository.existsById(busId));
                    /*if(!recordsRepository.existsById(busId)) {
                        //busRepository.save(bus);
                    }*/
                }
            }
        }catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            kafkaConsumer.close();
        }
    }
}
