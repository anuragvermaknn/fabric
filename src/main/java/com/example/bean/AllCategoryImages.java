package com.example.bean;

import java.util.Arrays;

public class AllCategoryImages
{
	private String id;
	private byte[] image;
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

	public byte[] getImage()
	{
		return image;
	}

	public void setImage(byte[] image)
	{
		this.image = image;
	}

	@Override
	public String toString()
	{
		return "AllCategoryImages [id=" + id + ", image=" + Arrays.toString(image) + ", productId=" + productId + "]";
	}

}
