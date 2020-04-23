package es.opo_bus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Bus implements Serializable {

    @Id
    private String busID;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Record> recordsList = new ArrayList<>();

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

    public List<Record> getRecordsList() {
        return recordsList;
    }

    public void setRecordsList(List<Record> recordsList) {
        this.recordsList = recordsList;
    }

    @Override
    public String toString() {
        return busID;
    }
}
