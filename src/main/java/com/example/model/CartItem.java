/**
 * @author Anurag
 * @description 
 */
package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.CascadeType;
/**
 * @author Anurag
 * @description 
 */
@Entity
@Table(name = "CartItem")
public class CartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private int id;

  @Column(name = "userId")
  private int userId;

  @Column(name = "itemId")
  private int itemId;

  //@Column(name = "measurement")
  @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
  @JoinColumn(name = "measurementId")
  private Measurement measurement;

  @Column(name = "qty")
  private int qty;

  @Column(name = "paymentDone")
  private boolean paymentDone = false;

//  @Column(name = "order")
  @ManyToOne
  @NotFound(action = NotFoundAction.IGNORE)
  @JoinColumn(name = "order_id")//,nullable = true
  private ProductOrder productOrder;

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
   * @return the itemId
   */
  public int getItemId() {
    return itemId;
  }

  /**
   * @author Anurag
   * @param itemId the itemId to set
   */
  public void setItemId(int itemId) {
    this.itemId = itemId;
  }

  /**
   * @author Anurag
   * @return the measurement
   */
//  public Measurement getMeasurement() {
//    return measurement;
//  }
  public Measurement getMeasurement() {
    return measurement;
  }

  /**
   * @author Anurag
   * @param measurement the measurement to set
   */
//  public void setMeasurement(Measurement measurement) {
//    this.measurement = measurement;
//  }

  public void setMeasurement(Measurement measurement) {
    this.measurement = measurement;
  }
  
  /**
   * @author Anurag
   * @return the qty
   */
  public int getQty() {
    return qty;
  }

  /**
   * @author Anurag
   * @param qty the qty to set
   */
  public void setQty(int qty) {
    this.qty = qty;
  }

  /**
   * @author Anurag
   * @return the paymentDone
   */
  public boolean isPaymentDone() {
    return paymentDone;
  }

  /**
   * @author Anurag
   * @param paymentDone the paymentDone to set
   */
  public void setPaymentDone(boolean paymentDone) {
    this.paymentDone = paymentDone;
  }

  /**
   * @author Anurag
   * @return the order
   */
  public ProductOrder getProductOrder() {
    return productOrder;
  }

  /**
   * @author Anurag
   * @param order the order to set
   */
  public void setProductOrder(ProductOrder order) {
    this.productOrder = order;
  }

  /**
   * @param id
   * @param userId
   * @param itemId
   * @param measurement
   * @param qty
   * @param paymentDone
   * @param order
   */
  public CartItem(int id, int userId, int itemId, Measurement measurement, int qty,
      boolean paymentDone, ProductOrder productOrder) {
    super();
    this.id = id;
    this.userId = userId;
    this.itemId = itemId;
    this.measurement = measurement;
    this.qty = qty;
    this.paymentDone = paymentDone;
    this.productOrder = productOrder;
  }

  /**
   * 
   */
  public CartItem() {
    super();
  }
  
  
}
