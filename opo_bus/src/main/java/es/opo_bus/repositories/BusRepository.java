package es.opo_bus.repositories;

import es.opo_bus.entities.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepository extends JpaRepository<Bus, String> {
}
