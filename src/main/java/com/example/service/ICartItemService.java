/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.List;

import com.example.model.CartItem;

/**
 * @author Anurag
 * @description 
 */
public interface ICartItemService {

  /******************** Save Api *****************************/

  public Boolean saveCartItem(CartItem cartItem);
  
  public CartItem saveAndGetCartItem(CartItem cartItem);

  public Boolean saveCartItem(List<CartItem> cartItems);
  
  public List<CartItem> saveAndGetCartItem(List<CartItem> cartItems);

  /******************** Find/Search Api *****************************/
    
  public List<CartItem> findByUserId(int userId);
  
  public List<CartItem> findByUserIdAndPaymentNotDone(int userId);
  
  public List<CartItem> findByUserIdAndPaymentDone(int userId);
    
  List<CartItem> findByIdIn(List<Integer> cartItemIds);
  
  /******************** Aggregate Api *****************************/

  /******************** Utility ***************************/

  public void createSampleData();
}
