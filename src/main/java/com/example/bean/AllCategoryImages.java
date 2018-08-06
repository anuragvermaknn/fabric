package com.example.bean;

import java.util.Arrays;

public class AllCategoryImages
{
	private String id;
	private byte[] image;
	private String productId;
	private String s3ImagePath;

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

	public byte[] getImage()
	{
		return image;
	}

	public void setImage(byte[] image)
	{
		this.image = image;
	}

  public String getS3ImagePath() {
    return s3ImagePath;
  }

  public void setS3ImagePath(String s3ImagePath) {
    this.s3ImagePath = s3ImagePath;
  }

  @Override
  public String toString() {
    return "AllCategoryImages [id=" + id + ", image=" + Arrays.toString(image) + ", productId="
        + productId + ", s3ImagePath=" + s3ImagePath + "]";
  }
		



}
