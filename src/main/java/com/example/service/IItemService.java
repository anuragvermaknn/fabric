/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.List;


import com.example.bean.ParameterBean;
import com.example.model.Item;

/**
 * @author Anurag
 * @description 
 */
public interface IItemService {

  
  /******************** Save Api *****************************/

  public Boolean saveItem(Item item);
  
  public Item saveAndGetItem(Item item);

  public Boolean saveItem(List<Item> items);
  
  public Item saveAndGetItem(List<Item> items);
  
  /******************** Find/Search Api *****************************/
  
//  public List<OrderRequest> findByCustomerIDOrderByCreatedDesc(String customerID);
//  public Page<OrderRequest> findByCustomerIDOrderByCreatedDesc(String customerID, Pageable pageable);
  
  public List<Item> findByEncodedString(String encodedString);
  
  public String getFilePathFromEncodedString(String encodedString);
  
  //public List<Item> findByEncodedString(String encodedString);
  /******************** Aggregate Api *****************************/
  
  /******************** Utility ***************************/
  
  public String getEncodedStringFromParameterBean(ParameterBean parameterBean);
  
  public void saveAllItemsForOnce();
  
}


/******************** Save Api *****************************/

/******************** Find/Search Api *****************************/
  
/******************** Aggregate Api *****************************/

/******************** Utility ***************************/
