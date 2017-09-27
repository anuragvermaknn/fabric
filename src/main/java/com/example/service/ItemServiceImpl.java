/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bean.AllCategoryImages;
import com.example.bean.ParameterBean;
import com.example.model.Item;
import com.example.repository.ItemRepository;

/**
 * @author Anurag
 * @description 
 */
@Service("itemService")
public class ItemServiceImpl implements IItemService{

  private final String BASE_PATH_FOR_IMAGES_IN_RESOURCES = "fabricImages/";
  private final String BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES = "categoryImages/";
  
  public static Map<String, List<AllCategoryImages>> mapOfAllCategoryImages;
  
  @Autowired
  private ItemRepository itemRepository;

  @PostConstruct
  public void init(){
      System.out.println(" @PostConstruct started working ");
      String encodedString = "1A-1B-1A-1B-1A-1B-1A";
      List<Item> items = findByEncodedString(encodedString);
      if(items.isEmpty()){
        System.out.println(" 0 item is present. Saving 1 item for now");
        saveSampleItem();
      }else{
        System.out.println(" At least 1 item is present. Doing nothing for now");
      }
      mapOfAllCategoryImages = getMapOfAllCategoryImages();
  }
  
  @Override
  public Boolean saveItem(Item item) {
    try
    {
      itemRepository.save(item);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return false;
    }
    return true;
  }

  @Override
  public Item saveAndGetItem(Item item) {
    
    return itemRepository.save(item);
  }

  @Override
  public Boolean saveItem(List<Item> items) {
    try
    {
      itemRepository.save(items);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return false;
    }
    return true;
  }

  @Override
  public List<Item> saveAndGetItem(List<Item> items) {
    
    return itemRepository.save(items);
  }

  @Override
  public List<Item> findByEncodedString(String encodedString) {
    
    return itemRepository.findByEncodedString(encodedString);
  }
  
  @Override
  public List<Item> findByParameterBean(ParameterBean parameterBean) {
    
    String encodedString = getEncodedStringFromParameterBean(parameterBean);
    return findByEncodedString(encodedString);
  }
  @Override
  public String getFilePathFromEncodedString(String encodedString) {

    try{
      List<Item> items = itemRepository.findByEncodedString(encodedString);
      return items.get(0).getFilePath();
    }catch(Exception e){
      return null;
    }        
  }
  
  @Override
  public String getFilePathFromParameterBean(ParameterBean parameterBean) {
    
    String encodedString = getEncodedStringFromParameterBean(parameterBean);
    return getFilePathFromEncodedString(encodedString);
  }

  @Override
  public List<Item> findByIdIn(List<Integer> itemIds) {
    return itemRepository.findByIdIn(itemIds);
  }
  /*
   * 1Silhouette-
   * + 2Neckline-
   * + 3Backline-
   * + 4Sleeves-
   * + 5Cloth-
   * + 6Border-
   * + 7Embroidery 
   * 
   */
  @Override
  public String getEncodedStringFromParameterBean(ParameterBean parameterBean) {

    StringBuilder encodedString  = new StringBuilder();
    encodedString.append(parameterBean.getSilhouette().toUpperCase());
    encodedString.append("-"+parameterBean.getNeckline().toUpperCase());
    encodedString.append("-"+parameterBean.getBackline().toUpperCase());
    encodedString.append("-"+parameterBean.getSleeves().toUpperCase());
    encodedString.append("-"+parameterBean.getCloth().toUpperCase());
    encodedString.append("-"+parameterBean.getBorder().toUpperCase());
    encodedString.append("-"+parameterBean.getEmbroidery().toUpperCase());
    return encodedString.toString();
  }

  @Override
  public void saveAllItemsForOnce() {
     
    
  }

  @Override
  public Item saveSampleItem(){
    Item item = new Item();
    String filePath = BASE_PATH_FOR_IMAGES_IN_RESOURCES+"1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
    String encodedString = "A-B-A-B-A-B-A";
    String productType = "kurta";
    item.setEncodedString(encodedString);
    item.setFilePath(filePath);
    item.setProductType(productType);
    if(itemRepository.findByEncodedString(encodedString).isEmpty()){
      saveItem(item);
    }
    return itemRepository.findByEncodedString(encodedString).get(0);
  }
  
//  @Override
//  public byte[] getImageByteArrayFromParameterBean(ParameterBean parameterBean) {
//    try {
//      
//      //String sampleImagePath =  "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
//      String filePathInResourceFolder = getFilePathFromParameterBean(parameterBean);
//      // Retrieve image from the classpath.
//      InputStream is = this.getClass().getClassLoader().getResourceAsStream(filePathInResourceFolder); 
//
//      // Prepare buffered image.
//      BufferedImage img = ImageIO.read(is);
//
//      // Create a byte array output stream.
//      ByteArrayOutputStream bao = new ByteArrayOutputStream();
//
//      // Write to output stream
//      ImageIO.write(img, "png", bao);
//
//      return bao.toByteArray();
//  } catch (IOException e) {
//      //logger.error(e);
//      throw new RuntimeException(e);
//  }
//    
//  }
  
  @Override
  public Map<String,byte[]> getImageByteArrayFromParameterBean(ParameterBean parameterBean) {

    Map<String, byte[]> viewImages = new HashMap<>();


    try {
      
      //String sampleImagePath =  "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
      String backFilePathInResourceFolder = getFilePathFromParameterBean(parameterBean);
      
      //fabricImages/1A-1B-1A-1B-1A-1B-1A_L1_optimized.png
      String leftFilePathInResourceFolder = backFilePathInResourceFolder.replace("BK", "L");
      
      //fabricImages/1A-1B-1A-1B-1A-1B-1A_F1_optimized.png
      String frontFilePathInResourceFolder = backFilePathInResourceFolder.replace("BK", "F");
      
      viewImages.put("left", _getImageByteArrayFromFilePathInResourceFolder(leftFilePathInResourceFolder));
      
      viewImages.put("front", _getImageByteArrayFromFilePathInResourceFolder(frontFilePathInResourceFolder));

      //FIX below. remove right below 
      viewImages.put("back", _getImageByteArrayFromFilePathInResourceFolder(backFilePathInResourceFolder));
      viewImages.put("right", _getImageByteArrayFromFilePathInResourceFolder(backFilePathInResourceFolder));
      
      return viewImages;
   } catch (Exception e) {
      //logger.error(e);
      throw new RuntimeException(e);
  }
    
  }
  
  @SuppressWarnings("unused")
  private byte[] _getImageByteArrayFromFilePathInResourceFolder(String filePathInResourceFolder){
     
    try {
      // Retrieve image from the classpath.
      InputStream is = this.getClass().getClassLoader().getResourceAsStream(filePathInResourceFolder);
      // Prepare buffered image.
      BufferedImage img = ImageIO.read(is);
  
      // Create a byte array output stream.
      ByteArrayOutputStream bao = new ByteArrayOutputStream();
  
      // Write to output stream
      ImageIO.write(img, "png", bao);
        
      return bao.toByteArray();  
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  
  }

  /* (non-Javadoc)
   * @see com.example.service.IItemService#getMapOfAllCategoryImages()
   */
  @Override
  public Map<String, List<AllCategoryImages>> getMapOfAllCategoryImages() {
    // TODO Auto-generated method stub
    Map<String, List<AllCategoryImages>> map = new HashMap<>();
    
    // Category 1
    List<AllCategoryImages> list = new ArrayList<>();
    AllCategoryImages categoryImage1 = new AllCategoryImages();
    categoryImage1.setId("a"); categoryImage1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"1a.png"));
    AllCategoryImages categoryImage2 = new AllCategoryImages();
    categoryImage2.setId("b"); categoryImage2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"1b.png"));
    
    list.add(categoryImage1); list.add(categoryImage2);
    
    // Category 2
    List<AllCategoryImages> list2 = new ArrayList<>();
    AllCategoryImages category2Image1 = new AllCategoryImages();
    category2Image1.setId("a"); category2Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"2a.png"));
    AllCategoryImages category2Image2 = new AllCategoryImages();
    category2Image2.setId("b"); category2Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"2b.png"));
    
    list2.add(category2Image1); list.add(category2Image2);
    
    // Category 3
    List<AllCategoryImages> list3 = new ArrayList<>();
    AllCategoryImages category3Image1 = new AllCategoryImages();
    category3Image1.setId("a"); category3Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"3a.png"));
    AllCategoryImages category3Image2 = new AllCategoryImages();
    category3Image2.setId("b"); category3Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"3b.png"));
    
    list3.add(category3Image1); list3.add(category3Image2);
    
    // Category 4
    List<AllCategoryImages> list4 = new ArrayList<>();
    AllCategoryImages category4Image1 = new AllCategoryImages();
    //category4Image1.setId(""); category4Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+""));
    AllCategoryImages category4Image2 = new AllCategoryImages();
    category4Image2.setId("b"); category4Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"4b.png"));
    
    //list4.add(category4Image1); 
    list4.add(category4Image2);
    
    // Category 5
    List<AllCategoryImages> list5 = new ArrayList<>();
    AllCategoryImages category5Image1 = new AllCategoryImages();
    //category5Image1.setId(""); category5Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+""));
    AllCategoryImages category5Image2 = new AllCategoryImages();
    category5Image2.setId("b"); category5Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"5b.png"));
    AllCategoryImages category5Image3 = new AllCategoryImages();
    category5Image3.setId("c"); category5Image3.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"5c.png"));
    
    //list5.add(category5Image1); 
    list5.add(category5Image2); list5.add(category5Image3);
    
    // Category 6
    List<AllCategoryImages> list6 = new ArrayList<>();
    AllCategoryImages category6Image1 = new AllCategoryImages();
    //category6Image1.setId(""); category6Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+""));
    AllCategoryImages category6Image2 = new AllCategoryImages();
    category6Image2.setId("b"); category6Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"6b.png"));
    
    //list6.add(category6Image1); 
    list6.add(category6Image2);
    
    // Category 7
    List<AllCategoryImages> list7 = new ArrayList<>();
    AllCategoryImages category7Image1 = new AllCategoryImages();
    //category7Image1.setId(""); category7Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+""));
    AllCategoryImages category7Image2 = new AllCategoryImages();
    category7Image2.setId("b"); category7Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"7b.png"));
    
    //list7.add(category7Image1); 
    list.add(category7Image2);

    map.put("0", list); map.put("1", list2); map.put("2", list3);
    map.put("3", list4); map.put("4", list5); map.put("5", list6);
    map.put("6", list7);
    
    return map;
  }

  /* (non-Javadoc)
   * @see com.example.service.IItemService#getStaticMapOfAllCategoryImages()
   */
  @Override
  public Map<String, List<AllCategoryImages>> getStaticMapOfAllCategoryImages() {
    // TODO Auto-generated method stub
    return mapOfAllCategoryImages;
  }
}
