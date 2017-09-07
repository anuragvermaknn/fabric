/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.List;

import com.example.model.ProductOrder;

/**
 * @author Anurag
 * @description 
 */
public interface IProductOrderService {

  /******************** Save Api *****************************/

  public Boolean saveProductOrder(ProductOrder productOrder);
  
  public ProductOrder saveAndGetProductOrder(ProductOrder productOrder);

  public Boolean saveProductOrder(List<ProductOrder> productOrders);
  
  public ProductOrder saveAndGetProductOrder(List<ProductOrder> productOrders);

  /******************** Find/Search Api *****************************/
    
  /******************** Aggregate Api *****************************/

  /******************** Utility ***************************/

}
