package es.opo_bus.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Bus {

    @Id
    private String busID;

    @OneToMany(mappedBy = "bus")
    private List<Records> recordsList;

    public Bus(){}

    public Bus(String busID) {
        this.busID = busID;
    }

    public String getBusID() {
        return busID;
    }

    public void setBusID(String busID) {
        this.busID = busID;
    }

    public List<Records> getRecordsList() {
        return recordsList;
    }

    public void setRecordsList(List<Records> recordsList) {
        this.recordsList = recordsList;
    }

    @Override
    public String toString() {
        return busID;
    }
}
