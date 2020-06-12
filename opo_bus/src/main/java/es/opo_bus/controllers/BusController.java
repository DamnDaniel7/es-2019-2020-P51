package es.opo_bus.controllers;


import es.opo_bus.entities.Bus;
import es.opo_bus.entities.Record;
import es.opo_bus.repositories.BusRepository;
import es.opo_bus.repositories.RecordsRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Api(tags = { "Bus" })
@SwaggerDefinition(tags = {
        @Tag(name = "Bus", description = "Operations with buses")
})
@Controller
public class BusController {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private RecordsRepository recordsRepository;

    @ApiOperation(value = "List all buses", response = Iterable.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/bus")
    public @ResponseBody Iterable<Bus> listBuses() {
        return busRepository.findAll();
    }

    @ApiOperation(value = "Get information from a bus", response = Iterable.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/bus/{id}")
    public @ResponseBody Optional<Bus> getBus(@PathVariable("id") String id) {
        return busRepository.findById(id);
    }

    @ApiOperation(value = "Get the last bus record", response = Record.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/bus/lastRecord/{id}")
    public @ResponseBody Record getBusLocation(@PathVariable("id") String id) {
        Bus bus = busRepository.getOne(id);
        List<Record> records = bus.getRecordsList();
        return records.get(records.size()-1);
    }

    @ApiOperation(value = "Get all records", response = Iterable.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/records")
    public @ResponseBody Iterable<Record> listRecords() {
        return recordsRepository.findAll();
    }

}
