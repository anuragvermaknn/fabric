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
  
  public CartItem saveAndGetCartItem(List<CartItem> cartItems);

  /******************** Find/Search Api *****************************/
    
  /******************** Aggregate Api *****************************/

  /******************** Utility ***************************/

}
