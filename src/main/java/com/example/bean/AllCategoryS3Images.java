/**
 * @author Anurag
 * @description 
 */
package com.example.bean;

import java.util.Arrays;

/**
 * @author Anurag
 * @description 
 */
public class AllCategoryS3Images {
  private String id;
  private String image;
  private String productId;

  public String getProductId()
  {
      return productId;
  }

  public void setProductId(String productId)
  {
      this.productId = productId;
  }

  public String getId()
  {
      return id;
  }

  public void setId(String id)
  {
      this.id = id;
  }

  public String getImage()
  {
      return image;
  }

  public void setImage(String image)
  {
      this.image = image;
  }

  @Override
  public String toString()
  {
      return "AllCategoryImages [id=" + id + ", image=" + image + ", productId=" + productId + "]";
  }

}
