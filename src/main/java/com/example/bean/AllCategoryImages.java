package com.example.bean;



public class AllCategoryImages
{
private String id;
private byte[] images;



public String getId()
{
	return id;
}
public void setId(String id)
{
	this.id = id;
}
public byte[] getImages()
{
	return images;
}
public void setImages(byte[] images)
{
	this.images = images;
}
@Override
public String toString()
{
	return "AllCategoryImages [id=" + id + ", images=" + images + "]";
}

}
