package es.opo_bus;

import es.opo_bus.consumers.BusConsumer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OpoBusApplication {

    public static void main(String[] args) {
        Thread data = new Thread(new BusConsumer());
        data.start();

        SpringApplication.run(OpoBusApplication.class, args);
    }

}
