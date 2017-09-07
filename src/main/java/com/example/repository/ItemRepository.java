/**
 * @author Anurag
 * @description 
 */
package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Item;


/**
 * @author Anurag
 * @description 
 */
@Repository("itemRepository")
public interface ItemRepository extends JpaRepository<Item, Long> {

  /********************* SAVE ****************************/
  
  
  
  /***************** FIND/SEARCH ****************************/
  
  List<Item> findByEncodedString(String encodedString);
  
}
