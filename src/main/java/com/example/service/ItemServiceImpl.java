/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
  
  @Override
  public byte[] getImageByteArrayFromParameterBean(ParameterBean parameterBean) {
    try {
      
      //String sampleImagePath =  "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
      String filePathInResourceFolder = getFilePathFromParameterBean(parameterBean);
      // Retrieve image from the classpath.
      InputStream is = this.getClass().getClassLoader().getResourceAsStream(filePathInResourceFolder); 

      // Prepare buffered image.
      BufferedImage img = ImageIO.read(is);

      // Create a byte array output stream.
      ByteArrayOutputStream bao = new ByteArrayOutputStream();

      // Write to output stream
      ImageIO.write(img, "jpg", bao);

      return bao.toByteArray();
  } catch (IOException e) {
      //logger.error(e);
      throw new RuntimeException(e);
  }
    
  }
}
