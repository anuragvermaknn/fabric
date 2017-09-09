/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.List;

import com.example.model.Measurement;

/**
 * @author Anurag
 * @description 
 */
public interface IMeasurementService {

  /******************** Save Api *****************************/

  public Boolean saveMeasurement(Measurement measurement);
  
  public Measurement saveAndGetMeasurement(Measurement measurement);

  public Boolean saveMeasurement(List<Measurement> measurements);
  
  public List<Measurement> saveAndGetMeasurement(List<Measurement> measurements);

  /******************** Find/Search Api *****************************/
    
  public List<Measurement> findByUserId(int userId);
  
  public List<Measurement> findByFirstMTAndSecondMT(String firstMT, String secondMT);
  
  public List<Measurement> findByType(String type);
  
  /******************** Aggregate Api *****************************/

  /******************** Utility ***************************/
  
}
