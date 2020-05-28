package es.opo_bus;

import es.opo_bus.entities.Alarm;
import es.opo_bus.entities.Bus;
import es.opo_bus.entities.Record;
import es.opo_bus.repositories.AlarmRepository;
import es.opo_bus.repositories.BusRepository;
import es.opo_bus.repositories.RecordsRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaReceiver {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RecordsRepository recordsRepository;

    @Autowired
    private AlarmRepository alarmRepository;

    @KafkaListener(topics = "bus")
    public void consume(String content) {
        System.out.println(content);
        JSONObject jsonpObject = new JSONObject(content);
        String recordId = jsonpObject.getString("id");
        String locationId = jsonpObject.getString("location_id");
        String busId = jsonpObject.getString("node_id");

        Bus bus = null;
        if(!busRepository.existsById(busId)) {
            bus = new Bus(busId);
            busRepository.saveAndFlush(bus);
        } else{
            bus = busRepository.getOne(busId);
        }

        String speedTemp = jsonpObject.getString("speed");
        double speed = 0;
        if(!speedTemp.equals("")) {
            speed = Double.parseDouble(speedTemp);
        }
        String ts = jsonpObject.getString("ts");
        String write_time = jsonpObject.getString("write_time");
        String latitude = jsonpObject.getString("lat");
        String longitude = jsonpObject.getString("lon");
        String head = jsonpObject.getString("head");
        Record record = new Record(recordId, speed, ts, write_time, head, longitude, latitude);
        record.setBus(bus);
        recordsRepository.saveAndFlush(record);

        for(Alarm alarm : bus.getAlarms()) {
            double d = calcDistance(Double.parseDouble(alarm.getLongitude()), Double.parseDouble(alarm.getLatitude()), Double.parseDouble(longitude), Double.parseDouble(latitude));
            if( d < 1.5) {
                alarm.setActive(true);
                alarmRepository.saveAndFlush(alarm);
            }
        }
    }

    private static double calcDistance(double lon1, double lat1, double lon2, double lat2) {
        double r = 6378.137;
        double dLat = rad(lat2 - lat1);
        double dLon = rad(lon2 - lon1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double d = r * c;
        return d;
    }

    private static double rad(double coord) {
        return coord * Math.PI / 180;
    }


}


