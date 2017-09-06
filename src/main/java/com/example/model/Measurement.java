/**
 * @author Anurag
 * @description 
 */
package com.example.model;

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
@Table(name = "Measurement")
public class Measurement {

  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private int id;

  @Column(name = "userId")
  private int userId;

  @Column(name = "firstMT")
  private String firstMT;

  @Column(name = "secondMT")
  private String secondMT;

  @Column(name = "type")
  private String type;

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
   * @return the userId
   */
  public int getUserId() {
    return userId;
  }

  /**
   * @author Anurag
   * @param userId the userId to set
   */
  public void setUserId(int userId) {
    this.userId = userId;
  }

  /**
   * @author Anurag
   * @return the firstMT
   */
  public String getFirstMT() {
    return firstMT;
  }

  /**
   * @author Anurag
   * @param firstMT the firstMT to set
   */
  public void setFirstMT(String firstMT) {
    this.firstMT = firstMT;
  }

  /**
   * @author Anurag
   * @return the secondMT
   */
  public String getSecondMT() {
    return secondMT;
  }

  /**
   * @author Anurag
   * @param secondMT the secondMT to set
   */
  public void setSecondMT(String secondMT) {
    this.secondMT = secondMT;
  }

  /**
   * @author Anurag
   * @return the type
   */
  public String getType() {
    return type;
  }

  /**
   * @author Anurag
   * @param type the type to set
   */
  public void setType(String type) {
    this.type = type;
  }

  /**
   * @param id
   * @param userId
   * @param firstMT
   * @param secondMT
   * @param type
   */
  public Measurement(int id, int userId, String firstMT, String secondMT, String type) {
    super();
    this.id = id;
    this.userId = userId;
    this.firstMT = firstMT;
    this.secondMT = secondMT;
    this.type = type;
  }

  /**
   * 
   */
  public Measurement() {
    super();
  }
  
  
}
