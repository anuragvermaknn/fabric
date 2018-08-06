package com.example.bean;

import java.util.Map;

public class ModelBean
{
private Map<String,byte[]> viewImages;
private Map<String, String> s3ImagePaths;

public Map<String, byte[]> getViewImages()
{
	return viewImages;
}

public void setViewImages(Map<String, byte[]> viewImages)
{
	this.viewImages = viewImages;
}

public Map<String, String> getS3ImagePaths() {
  return s3ImagePaths;
}

public void setS3ImagePaths(Map<String, String> s3ImagePaths) {
  this.s3ImagePaths = s3ImagePaths;
}


}
