package es.opo_bus.controllers;

import es.opo_bus.entities.Alarm;
import es.opo_bus.entities.User;
import es.opo_bus.repositories.AlarmRepository;
import es.opo_bus.repositories.BusRepository;
import es.opo_bus.repositories.UserRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/alarm")
@Api(tags = { "Alarms" })
@SwaggerDefinition(tags = {
        @Tag(name = "Cart", description = "Operations with alarms")
})
public class AlarmController {

    @Autowired
    private AlarmRepository alarmRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusRepository busRepository;

    @ApiOperation(value = "List all alarms for one user", response = Iterable.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/{username}")
    public ResponseEntity listAlarms(@PathVariable("username") String username) {
        return new ResponseEntity<>( userRepository.getOne(username).getAlarms(),HttpStatus.OK);
    }

    @ApiOperation(value = "Add new alarm")
    @ApiResponses(value={
            @ApiResponse(code=201,message="Alarm created"),
            @ApiResponse(code=500,message="Internal Server Error"),
        }
    )
    @CrossOrigin(origins = "*")
    @PostMapping(value = "/addalarm", consumes = "application/json")
    public ResponseEntity createAlarm(@RequestBody Map<String, Object> jsonObject) {
        String longitude = jsonObject.get("longitude").toString();
        String latitude = jsonObject.get("latitude").toString();
        String date = jsonObject.get("date").toString();
        String busId = jsonObject.get("bus").toString();
        String username = jsonObject.get("username").toString();

        Alarm alarm = new Alarm();
        alarm.setDate(date);
        alarm.setLatitude(latitude);
        alarm.setLongitude(longitude);
        alarm.setBus(busRepository.getOne(busId));
        alarm.setUser(userRepository.getOne(username));

        alarmRepository.saveAndFlush(alarm);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ApiOperation(value = "Delete alarm")
    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/removealarm/{id}")
    public ResponseEntity<Boolean> deleteAlarm(@PathVariable("id") long id) {
        if(!alarmRepository.findById(id).isPresent())
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        alarmRepository.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }


}
