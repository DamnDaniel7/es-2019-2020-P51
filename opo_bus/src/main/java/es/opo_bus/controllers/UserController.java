package es.opo_bus.controllers;

import es.opo_bus.entities.User;
import es.opo_bus.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/signin", consumes = "application/json")
    public ResponseEntity signIn(@RequestBody Map<String, Object> jsonObject) {
        User user = new User();
        user.setUsername(jsonObject.get("username").toString());
        user.setPassword(jsonObject.get("password").toString());
        return new ResponseEntity<>(userRepository.saveAndFlush(user), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/login", consumes = "application/json")
    public ResponseEntity login(@RequestBody Map<String, Object> credentials) {
        String username = credentials.get("username").toString();
        String password = credentials.get("password").toString();

        Optional<User> userOpt = userRepository.findById(username);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            if(!user.getPassword().equals(password))
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public Iterable<User> listUsers(){
        return userRepository.findAll();
    }

}
