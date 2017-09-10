package com.example.bean;

import java.util.List;

public class AllCategoryImages
{
private String id;
private List<byte[]> images;



public String getId()
{
	return id;
}
public void setId(String id)
{
	this.id = id;
}
public List<byte[]> getImages()
{
	return images;
}
public void setImages(List<byte[]> images)
{
	this.images = images;
}
@Override
public String toString()
{
	return "AllCategoryImages [id=" + id + ", images=" + images + "]";
}

}
