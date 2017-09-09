/**
 * @author Anurag
 * @description 
 */
package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.CartItem;

/**
 * @author Anurag
 * @description 
 */
@Repository("cartItemRepository")
public interface ICartItemRepository extends JpaRepository<CartItem, Long> {

  /********************* SAVE ****************************/
  
  
  
  /***************** FIND/SEARCH ****************************/
  
  List<CartItem> findByUserId(int userId);
  
  List<CartItem> findByUserIdAndPaymentDone(int userId, boolean paymentDone);

  List<CartItem> findByIdIn(List<Integer> cartItemIds);
}
