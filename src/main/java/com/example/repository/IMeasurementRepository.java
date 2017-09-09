/**
 * @author Anurag
 * @description 
 */
package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Measurement;

/**
 * @author Anurag
 * @description 
 */
@Repository("measurementRepository")
public interface IMeasurementRepository extends JpaRepository<Measurement, Long> {

  /********************* SAVE ****************************/
  
  
  
  /***************** FIND/SEARCH ****************************/
  
  List<Measurement> findByUserId(int userId);
  
  List<Measurement> findByFirstMTAndSecondMT(String firstMT, String secondMT);
  
  List<Measurement> findByType(String type);
  
  
}
