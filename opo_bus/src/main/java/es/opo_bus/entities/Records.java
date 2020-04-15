package es.opo_bus.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Records {

    @Id
    private String recordsId;

    @ManyToOne
    @JoinColumn(name="busID")
    private Bus bus;

    @ManyToOne
    @JoinColumn(name="locationId")
    private Location location;

    double speed;
    String timestamp;
    String writeTime;

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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
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
}
