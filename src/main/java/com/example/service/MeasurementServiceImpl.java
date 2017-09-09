/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Measurement;
import com.example.repository.IMeasurementRepository;

/**
 * @author Anurag
 * @description 
 */
@Service("measurementService")
public class MeasurementServiceImpl implements IMeasurementService{

  @Autowired
  private IMeasurementRepository measurementRepository;
  
  @Override
  public Boolean saveMeasurement(Measurement measurement) {
    try
    {
      measurementRepository.save(measurement);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return false;
    }
    return true;
  }

  @Override
  public Measurement saveAndGetMeasurement(Measurement measurement) {
    
    return measurementRepository.save(measurement);
  }

  @Override
  public Boolean saveMeasurement(List<Measurement> measurements) {
    try
    {
      measurementRepository.save(measurements);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return false;
    }
    return true;
  }

  @Override
  public List<Measurement> saveAndGetMeasurement(List<Measurement> measurements) {
    
    return measurementRepository.save(measurements);
  }

  @Override
  public List<Measurement> findByUserId(int userId) {
    
    return measurementRepository.findByUserId(userId);
  }

  @Override
  public List<Measurement> findByFirstMTAndSecondMT(String firstMT, String secondMT) {
    
    return measurementRepository.findByFirstMTAndSecondMT(firstMT, secondMT);
  }

  @Override
  public List<Measurement> findByType(String type) {
    
    return measurementRepository.findByType(type);
  }

}
