/**
 * @author Anurag
 * @description 
 */
package com.example.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Anurag
 * @description 
 */
@Entity
@Table(name = "Item")
public class Item {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private int id;

  @Column(name = "productType")
  private String productType;

  @Column(name = "encodedString")
  private String encodedString;

  @Column(name = "filePath")
  private String filePath;

  @Column(name = "pricePerUnit")
  private String pricePerUnit;

  /**
   * @author Anurag
   * @return the id
   */
  public int getId() {
    return id;
  }

  /**
   * @author Anurag
   * @param id the id to set
   */
  public void setId(int id) {
    this.id = id;
  }

  /**
   * @author Anurag
   * @return the productType
   */
  public String getProductType() {
    return productType;
  }

  /**
   * @author Anurag
   * @param productType the productType to set
   */
  public void setProductType(String productType) {
    this.productType = productType;
  }

  /**
   * @author Anurag
   * @return the encodedString
   */
  public String getEncodedString() {
    return encodedString;
  }

  /**
   * @author Anurag
   * @param encodedString the encodedString to set
   */
  public void setEncodedString(String encodedString) {
    this.encodedString = encodedString;
  }

  /**
   * @author Anurag
   * @return the filePath
   */
  public String getFilePath() {
    return filePath;
  }

  /**
   * @author Anurag
   * @param filePath the filePath to set
   */
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  /**
   * @author Anurag
   * @return the pricePerUnit
   */
  public String getPricePerUnit() {
    return pricePerUnit;
  }

  /**
   * @author Anurag
   * @param pricePerUnit the pricePerUnit to set
   */
  public void setPricePerUnit(String pricePerUnit) {
    this.pricePerUnit = pricePerUnit;
  }

  /**
   * @param id
   * @param productType
   * @param encodedString
   * @param filePath
   * @param pricePerUnit
   */
  public Item(int id, String productType, String encodedString, String filePath,
      String pricePerUnit) {
    super();
    this.id = id;
    this.productType = productType;
    this.encodedString = encodedString;
    this.filePath = filePath;
    this.pricePerUnit = pricePerUnit;
  }

  /**
   * 
   */
  public Item() {
    super();
  }
  
  
  
}
