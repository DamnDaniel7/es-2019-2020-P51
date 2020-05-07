package es.opo_bus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Record implements Serializable {

    @Id
    private String recordsId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="busID")
    private Bus bus;


    double speed;
    String timestamp;
    String writeTime;
    String head;
    String longitude;
    String latitude;

    public Record() {}

    public Record(String recordsId, double speed, String timestamp, String writeTime, String head, String longitude, String latitude) {
        this.recordsId = recordsId;
        this.speed = speed;
        this.timestamp = timestamp;
        this.writeTime = writeTime;
        this.head = head;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public String getRecordsId() {
        return recordsId;
    }

    public void setRecordsId(String id) {
        this.recordsId = id;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getWriteTime() {
        return writeTime;
    }

    public void setWriteTime(String writeTime) {
        this.writeTime = writeTime;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }
}
