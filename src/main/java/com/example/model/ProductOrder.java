/**
 * @author Anurag
 * @description 
 */
package com.example.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * @author Anurag
 * @description 
 */
@Entity
@Table(name = "ProductOrder")
public class ProductOrder {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private int id;

  @Column(name = "userId")
  private int userId;

//  @Column(name = "cartItems")
//     
  @OneToMany(targetEntity = CartItem.class, mappedBy = "productOrder",
      cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  private List<CartItem> cartItems;

  @Column(name = "country")
  private String country;

  @Column(name = "city")
  private String city;

  @Column(name = "address")
  private String address;

  @Column(name = "pinCode")
  private String pinCode;

  @Column(name = "orderDate")
  private String orderDate;

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
   * @return the cartItems
   */
  public List<CartItem> getCartItems() {
    return cartItems;
  }

  /**
   * @author Anurag
   * @param cartItems the cartItems to set
   */
  public void setCartItems(List<CartItem> cartItems) {
    this.cartItems = cartItems;
  }

  /**
   * @author Anurag
   * @return the country
   */
  public String getCountry() {
    return country;
  }

  /**
   * @author Anurag
   * @param country the country to set
   */
  public void setCountry(String country) {
    this.country = country;
  }

  /**
   * @author Anurag
   * @return the city
   */
  public String getCity() {
    return city;
  }

  /**
   * @author Anurag
   * @param city the city to set
   */
  public void setCity(String city) {
    this.city = city;
  }

  /**
   * @author Anurag
   * @return the address
   */
  public String getAddress() {
    return address;
  }

  /**
   * @author Anurag
   * @param address the address to set
   */
  public void setAddress(String address) {
    this.address = address;
  }

  /**
   * @author Anurag
   * @return the pinCode
   */
  public String getPinCode() {
    return pinCode;
  }

  /**
   * @author Anurag
   * @param pinCode the pinCode to set
   */
  public void setPinCode(String pinCode) {
    this.pinCode = pinCode;
  }


  /**
   * @author Anurag
   * @return the orderDate
   */
  public String getOrderDate() {
    return orderDate;
  }

  /**
   * @author Anurag
   * @param orderDate the orderDate to set
   */
  public void setOrderDate(String orderDate) {
    this.orderDate = orderDate;
  }

  
  /**
   * @param id
   * @param userId
   * @param cartItems
   * @param country
   * @param city
   * @param address
   * @param pinCode
   * @param orderDate
   */
  public ProductOrder(int id, int userId, List<CartItem> cartItems, String country, String city,
      String address, String pinCode, String orderDate) {
    super();
    this.id = id;
    this.userId = userId;
    this.cartItems = cartItems;
    this.country = country;
    this.city = city;
    this.address = address;
    this.pinCode = pinCode;
    this.orderDate = orderDate;
  }

  /**
   * 
   */
  public ProductOrder() {
    super();
  }

  /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
  @Override
  public String toString() {
    return "ProductOrder [id=" + id + ", userId=" + userId + ", cartItems=" + cartItems
        + ", country=" + country + ", city=" + city + ", address=" + address + ", pinCode="
        + pinCode + ", orderDate=" + orderDate + "]";
  }
  
  
}
