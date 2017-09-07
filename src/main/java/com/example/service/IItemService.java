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
  
  public List<Item> saveAndGetItem(List<Item> items);
  
  /******************** Find/Search Api *****************************/
  
//  public List<OrderRequest> findByCustomerIDOrderByCreatedDesc(String customerID);
//  public Page<OrderRequest> findByCustomerIDOrderByCreatedDesc(String customerID, Pageable pageable);
  
  public List<Item> findByEncodedString(String encodedString);
  
  public List<Item> findByParameterBean(ParameterBean parameterBean);
  
  public String getFilePathFromEncodedString(String encodedString);
  
  public String getFilePathFromParameterBean(ParameterBean parameterBean);
  
  /******************** Aggregate Api *****************************/
  
  /******************** Utility ***************************/
  
  public String getEncodedStringFromParameterBean(ParameterBean parameterBean);
  
  public void saveAllItemsForOnce();
  
  public byte[] getImageByteArrayFromParameterBean(ParameterBean parameterBean);
  
}


/******************** Save Api *****************************/

/******************** Find/Search Api *****************************/
  
/******************** Aggregate Api *****************************/

/******************** Utility ***************************/
