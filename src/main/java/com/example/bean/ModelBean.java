package com.example.bean;

import java.util.Map;

public class ModelBean
{
//private Map<String,byte[]> viewImages;
  private Map<String,String> viewImages;
public Map<String, String> getViewImages()
{
	return viewImages;
}

public void setViewImages(Map<String, String> viewImages)
{
	this.viewImages = viewImages;
}

}
