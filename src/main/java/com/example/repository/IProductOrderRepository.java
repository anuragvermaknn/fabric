/**
 * @author Anurag
 * @description 
 */
package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.ProductOrder;

/**
 * @author Anurag
 * @description 
 */
@Repository("productOrderRepository")
public interface IProductOrderRepository extends JpaRepository<ProductOrder, Long> {

  /********************* SAVE ****************************/
  
  
  
  /***************** FIND/SEARCH ****************************/
  

}
