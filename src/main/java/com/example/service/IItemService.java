/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.List;
import java.util.Map;

import com.example.bean.AllCategoryImages;
import com.example.bean.AllCategoryS3Images;
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
  
  public List<Item> findByIdIn(List<Integer> itemIds);
  /******************** Aggregate Api *****************************/
  
  /******************** Utility ***************************/
  
  public String getEncodedStringFromParameterBean(ParameterBean parameterBean);
  
  public void saveAllItemsForOnce();
  
  public Item saveSampleItem();
  
  //public byte[] getImageByteArrayFromParameterBean(ParameterBean parameterBean);
  
  public Map<String,byte[]> getImageByteArrayFromParameterBean(ParameterBean parameterBean);
  
  public Map<String, List<AllCategoryImages>> getMapOfAllCategoryImages();
  
  public Map<String, List<AllCategoryImages>> getStaticMapOfAllCategoryImages();

  /**
   * @author Anurag
   * @Time -  23-Feb-2018 - 11:25:51 am
   * @param parameterBean
   * @return
   */
  Map<String, String> getImageS3PathFromParameterBean(ParameterBean parameterBean);

  /**
   * @author Anurag
   * @Time -  23-Feb-2018 - 11:57:39 am
   * @return
   */
  Map<String, List<AllCategoryS3Images>> getMapOfAllCategoryS3Images();

  /**
   * @author Anurag
   * @Time -  23-Feb-2018 - 12:00:27 pm
   * @return
   */
  Map<String, List<AllCategoryS3Images>> getStaticMapOfAllCategoryS3Images();
}


/******************** Save Api *****************************/

/******************** Find/Search Api *****************************/
  
/******************** Aggregate Api *****************************/

/******************** Utility ***************************/
