package es.opo_bus.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class BusController {

    @GetMapping("/bus")
    public String listBuses() {
        return "";
    }

    @GetMapping("/bus/{id}")
    public String getBus(@PathVariable("id") String id) {
        return "";
    }

    @GetMapping("/bus/location")
    public String getBusesLocation() {
        return "";
    }

    @GetMapping("/bus/location/{id}")
    public String getBusLocation(@PathVariable("id") String id) {
        return "";
    }

    @GetMapping("/bus/information/{bus}")
    public String getBusInformation(@PathVariable("id") String id) {
        return "";
    }


}
