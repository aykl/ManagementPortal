package org.radarcns.management.repository;

import org.radarcns.management.domain.SensorData;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SensorData entity.
 */
@SuppressWarnings("unused")
public interface SensorDataRepository extends JpaRepository<SensorData,Long> {

}