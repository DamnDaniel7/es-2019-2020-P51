package es.opo_bus.repositories;

import es.opo_bus.entities.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordsRepository extends JpaRepository<Record, String> {
}
