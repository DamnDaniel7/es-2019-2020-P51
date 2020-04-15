package es.opo_bus.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Location {

    @Id
    String locationId;

    String head;
    String longitude;
    String latitude;

    @OneToMany(mappedBy = "location")
    List<Records> recordsList;

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String id) {
        this.locationId = id;
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

    public List<Records> getRecordsList() {
        return recordsList;
    }

    public void setRecordsList(List<Records> recordsList) {
        this.recordsList = recordsList;
    }
}
