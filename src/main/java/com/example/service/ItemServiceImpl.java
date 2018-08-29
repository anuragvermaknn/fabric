/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintWriter;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.bean.AllCategoryImages;
import com.example.bean.ParameterBean;
import com.example.model.Item;
import com.example.repository.ItemRepository;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

/**
 * @author Anurag
 * @description
 */
@Service("itemService")
@CacheConfig(cacheNames = "fabric", cacheManager = "cacheManager")
public class ItemServiceImpl implements IItemService {

	private final String BASE_PATH_FOR_IMAGES_IN_RESOURCES = "fabricImages/";
	private final String BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES = "categoryImages/";
	private final char[] ALPHABETS = "abcdefghijklmnopqrstuvwxyz".toCharArray();
	public static Map<String, List<AllCategoryImages>> mapOfAllCategoryImages;

	private final String FILE_PATH_PARAMETER_TO_IMAGES_FOLDER_MAP_IN_RESOURCES = "ParameterToModelMap.txt";
	private final String FILE_PATH_PARAMETER_TO_IMAGES_FILENAMES_MAP_IN_RESOURCES = "ParameterToFilenames.txt";
    public static Map<String, String> mapOfParamterAndImagesFolder = new HashMap<String, String>();
    public static Map<String, List<String>> mapOfParamterToFilenames = new HashMap<>();
    private final String CDN_BASE_PATH = "https://d18tnfgpuprpgw.cloudfront.net/";

	@Autowired
	private ItemRepository itemRepository;

	@PostConstruct
	public void init() {
		System.out.println(" @PostConstruct started working ");
		String encodedString = "1A-1B-1A-1B-1A-1B-1A";
		List<Item> items = findByEncodedString(encodedString);
		if (items.isEmpty()) {
			System.out.println(" 0 item is present. Saving 1 item for now");
			// saveSampleItem();
		} else {
			System.out.println(" At least 1 item is present. Doing nothing for now");
		}
		mapOfAllCategoryImages = getMapOfAllCategoryImages();
		// loadMapOfParamterAndImagesFolder();
		try {
			loadMapOfParamterAndImagesFolder();
			loadMapOfParamterAndImagesFilenames();
			Map<String, List<String>> paramterToFilenames = new HashMap<>();
			// mapOfParamterAndImagesFolder
			for (Map.Entry<String, String> entry : mapOfParamterAndImagesFolder.entrySet()) {
				String imageFolder = entry.getValue();
				String parameterString = entry.getKey();
				// System.out.println("\n\n\n For image "+entry.getKey());
				
				//NOTE Just a one time call to create the csv
				//List<String> filenames = getResourceFilePaths(imageFolder);
				//paramterToFilenames.put(parameterString, filenames);
				
				
				List<String> filenames = mapOfParamterToFilenames.get(parameterString);
				System.out.println("filenames "+filenames);
				// System.out.println("getBackImage "+ getBackImage(filenames));
				// System.out.println("getFrontImage "+getFrontImage(filenames));
				// System.out.println("getLeftImage "+getLeftImage(filenames));
				
				saveSampleItem(parameterString, getFrontImage(filenames), getBackImage(filenames),
						getLeftImage(filenames));
			}
			
			System.out.println("Writing FILE_PATH_PARAMETER_TO_IMAGES_FILENAMES_MAP_IN_RESOURCES");
			//NOTE Just a one time call to create the csv
			//writeToCsvFromMap(FILE_PATH_PARAMETER_TO_IMAGES_FILENAMES_MAP_IN_RESOURCES, paramterToFilenames);
			
			for (String filename : getResourceFilePaths("4B-1A-1B-1A")) {
				System.out.println(filename);
			}
			List<String> filenames = getResourceFilePaths("4B-1A-1B-1A");
			System.out.println("getBackImage " + getBackImage(filenames));
			System.out.println("getFrontImage " + getFrontImage(filenames));
			System.out.println("getLeftImage " + getLeftImage(filenames));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public Boolean saveItem(Item item) {
		try {
			itemRepository.save(item);
		} catch (Exception e) {
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
		try {
			itemRepository.save(items);
		} catch (Exception e) {
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
	@Cacheable
	public List<Item> findByParameterBean(ParameterBean parameterBean) {

		String encodedString = getEncodedStringFromParameterBean(parameterBean);
		return findByEncodedString(encodedString);
	}

	@Override
	public String getFilePathFromEncodedString(String encodedString) {

		try {
			List<Item> items = itemRepository.findByEncodedString(encodedString);
			return items.get(0).getFilePath();
		} catch (Exception e) {
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
	 * 1Silhouette- + 2Neckline- + 3Backline- + 4Sleeves- + 5Cloth- + 6Border- +
	 * 7Embroidery
	 * 
	 */
	@Override
	public String getEncodedStringFromParameterBean(ParameterBean parameterBean) {

		StringBuilder encodedString = new StringBuilder();
		encodedString.append(parameterBean.getSilhouette().toUpperCase());
		encodedString.append("-" + parameterBean.getNeckline().toUpperCase());
		encodedString.append("-" + parameterBean.getBackline().toUpperCase());
		encodedString.append("-" + parameterBean.getSleeves().toUpperCase());
		encodedString.append("-" + parameterBean.getCloth().toUpperCase());
		encodedString.append("-" + parameterBean.getBorder().toUpperCase());
		encodedString.append("-" + parameterBean.getEmbroidery().toUpperCase());
		return encodedString.toString();
	}

	@Override
	public void saveAllItemsForOnce() {

	}

	@Override
	public Item saveSampleItem() {
		Item item = new Item();
		String filePath = BASE_PATH_FOR_IMAGES_IN_RESOURCES + "1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
		String encodedString = "A-B-A-B-A-B-A";
		String productType = "kurta";
		item.setEncodedString(encodedString);
		item.setFilePath(filePath);
		item.setProductType(productType);
		if (itemRepository.findByEncodedString(encodedString).isEmpty()) {
			saveItem(item);
		}
		return itemRepository.findByEncodedString(encodedString).get(0);
	}

	public Item saveSampleItem(String encodedString, String frontFilePath, String backFilePath, String leftFilePath) {
		Item item = new Item();
		String filePath = BASE_PATH_FOR_IMAGES_IN_RESOURCES + "1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
		// String encodedString = "A-B-A-B-A-B-A";
		String productType = "kurta";
		item.setEncodedString(encodedString);
		// item.setFilePath(filePath);
		item.setProductType(productType);
		item.setBackFilePath(backFilePath);
		item.setFrontFilePath(frontFilePath);
		item.setLeftFilePath(leftFilePath);
		if (itemRepository.findByEncodedString(encodedString).isEmpty()) {
			saveItem(item);
		}
		return itemRepository.findByEncodedString(encodedString).get(0);
	}
	// @Override
	// public byte[] getImageByteArrayFromParameterBean(ParameterBean
	// parameterBean) {
	// try {
	//
	// //String sampleImagePath =
	// "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
	// String filePathInResourceFolder =
	// getFilePathFromParameterBean(parameterBean);
	// // Retrieve image from the classpath.
	// InputStream is =
	// this.getClass().getClassLoader().getResourceAsStream(filePathInResourceFolder);
	//
	// // Prepare buffered image.
	// BufferedImage img = ImageIO.read(is);
	//
	// // Create a byte array output stream.
	// ByteArrayOutputStream bao = new ByteArrayOutputStream();
	//
	// // Write to output stream
	// ImageIO.write(img, "png", bao);
	//
	// return bao.toByteArray();
	// } catch (IOException e) {
	// //logger.error(e);
	// throw new RuntimeException(e);
	// }
	//
	// }

	@Override
	// @Cacheable
	public Map<String, byte[]> getImageByteArrayFromParameterBean(ParameterBean parameterBean) {

		Map<String, byte[]> viewImages = new HashMap<>();

		try {

			// String sampleImagePath =
			// "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
			// String backFilePathInResourceFolder =
			// getFilePathFromParameterBean(parameterBean);

			// fabricImages/1A-1B-1A-1B-1A-1B-1A_L1_optimized.png
			// String leftFilePathInResourceFolder =
			// backFilePathInResourceFolder.replace("BK", "L");

			// fabricImages/1A-1B-1A-1B-1A-1B-1A_F1_optimized.png
			// String frontFilePathInResourceFolder =
			// backFilePathInResourceFolder.replace("BK", "F");

			String encodedString = getEncodedStringFromParameterBean(parameterBean);
			System.out.println("encodedString : " + encodedString);
			List<Item> items = findByEncodedString(encodedString);
			Item item = items.get(0);
			System.out.println("Id of image fetched" + item.getId());
			String backFilePathInResourceFolder = item.getBackFilePath();
			String leftFilePathInResourceFolder = item.getLeftFilePath();
			String frontFilePathInResourceFolder = item.getFrontFilePath();

			byte[] leftImage = _getImageByteArrayFromFilePathInResourceFolder(leftFilePathInResourceFolder);
			//TODO
			//viewImages.put("left", leftImage);
			viewImages.put("left", new byte[1]);
			
			byte[] frontImage = _getImageByteArrayFromFilePathInResourceFolder(frontFilePathInResourceFolder);
			viewImages.put("front", frontImage);

			// FIX below. remove right below
			byte[] backImage = _getImageByteArrayFromFilePathInResourceFolder(backFilePathInResourceFolder);
			viewImages.put("back", backImage);
			
			//TODO
			//viewImages.put("right", backImage);
			viewImages.put("right", new byte[1]);
			
			int sizeOfImagesSent = leftImage.length + frontImage.length + backImage.length;
			System.out.println("Size of images sent in bytes " + sizeOfImagesSent);
			int sizeOfImagesSentKB = sizeOfImagesSent / 1024;
			System.out.println("Size of images sent in KB " + sizeOfImagesSentKB);
			int sizeOfImagesSentMB = sizeOfImagesSentKB / 1024;
			System.out.println("Size of images sent in MB " + sizeOfImagesSentMB);
			return viewImages;
		} catch (Exception e) {
			// logger.error(e);
			throw new RuntimeException(e);
		}

	}

	  @Override
	  public Map<String, String> getS3ImageByteArrayFromParameterBean(ParameterBean parameterBean) {

	    //Map<String, byte[]> viewImages = new HashMap<>();
	    Map<String, String> s3ImagePaths = new HashMap<>();

        try {

            // String sampleImagePath =
            // "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
            // String backFilePathInResourceFolder =
            // getFilePathFromParameterBean(parameterBean);

            // fabricImages/1A-1B-1A-1B-1A-1B-1A_L1_optimized.png
            // String leftFilePathInResourceFolder =
            // backFilePathInResourceFolder.replace("BK", "L");

            // fabricImages/1A-1B-1A-1B-1A-1B-1A_F1_optimized.png
            // String frontFilePathInResourceFolder =
            // backFilePathInResourceFolder.replace("BK", "F");

            String encodedString = getEncodedStringFromParameterBean(parameterBean);
            System.out.println("encodedString : " + encodedString);
            List<Item> items = findByEncodedString(encodedString);
            Item item = items.get(0);
            System.out.println("Id of image fetched" + item.getId());
            String backFilePathInResourceFolder = item.getBackFilePath();
            String leftFilePathInResourceFolder = item.getLeftFilePath();
            String frontFilePathInResourceFolder = item.getFrontFilePath();

            String leftImage = _getS3ImagPathFromFilePathInResourceFolder(leftFilePathInResourceFolder);
            //TODO
            //viewImages.put("left", leftImage);
            s3ImagePaths.put("left", leftImage);
            
            String frontImage = _getS3ImagPathFromFilePathInResourceFolder(frontFilePathInResourceFolder);
            s3ImagePaths.put("front", frontImage);

            // FIX below. remove right below
            String backImage = _getS3ImagPathFromFilePathInResourceFolder(backFilePathInResourceFolder);
            s3ImagePaths.put("back", backImage);
            
            //TODO
            //viewImages.put("right", backImage);
            s3ImagePaths.put("right", backImage);
            

            return s3ImagePaths;
        } catch (Exception e) {
            // logger.error(e);
            throw new RuntimeException(e);
        }
	  }	
	
	@SuppressWarnings("unused")
	private byte[] _getImageByteArrayFromFilePathInResourceFolder(String filePathInResourceFolder) {

		try {
			// Retrieve image from the classpath.
			InputStream is = this.getClass().getClassLoader().getResourceAsStream(filePathInResourceFolder);
			// Prepare buffered image.
			BufferedImage img = ImageIO.read(is);

			// Create a byte array output stream.
			ByteArrayOutputStream bao = new ByteArrayOutputStream();

			// Write to output stream
			ImageIO.write(img, "jpg", bao);
			bao.flush();
			 
			String base64String = Base64.encode(bao.toByteArray());
			bao.close();
	 
			byte[] bytearray = Base64.decode(base64String);
			
			return bytearray;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		}

	}

	private String _getS3ImagPathFromFilePathInResourceFolder(String filePathInResourceFolder) {

	  String s3CDNPath = CDN_BASE_PATH + filePathInResourceFolder;
	    
	    return s3CDNPath;
	}
	@SuppressWarnings("unused")
	private byte[] _getImageByteArrayFromAbsoluteFilePath(String absoluteFilePath) {

		try {
			// Retrieve image from the abs file path.
			InputStream is = new FileInputStream(absoluteFilePath);
			// Prepare buffered image.
			BufferedImage img = ImageIO.read(is);
		
			// Create a byte array output stream.
			
			
			ByteArrayOutputStream bao=new ByteArrayOutputStream(1000);
			
			ImageIO.write(img, "jpg", bao);
			bao.flush();
	 
			String base64String=Base64.encode(bao.toByteArray());
			bao.close();
	 
			byte[] bytearray = Base64.decode(base64String);
			
			return bytearray;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		}

	}

	public List<String> getSortedFilePathsInDir(String directoryPathInResources) {

		List<String> filepaths = new ArrayList<String>();
		String directoryPath = this.getClass().getClassLoader().getResource(directoryPathInResources).getPath();
		// If this pathname does not denote a directory, then listFiles() returns null.
		File[] files = new File(directoryPath).listFiles();

		for (File file : files) {
			if (file.isFile()) {
				// System.out.println("file.getPath() " + file.getPath());
				filepaths.add(file.getPath());
			}
		}
		Collections.sort(filepaths);
		return filepaths;
	}

	/*
	 * @see com.example.service.IItemService#getMapOfAllCategoryImages()
	 */
	@Override
	public Map<String, List<AllCategoryImages>> getMapOfAllCategoryImages() {
		// TODO Auto-generated method stub
		Map<String, List<AllCategoryImages>> map = new HashMap<>();

		// Category 1 sillhoute
		List<AllCategoryImages> list = new ArrayList<>();
		String directoryPathInResources = BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "sillhoute";
		List<String> filepaths = getSortedFilePathsInDir(directoryPathInResources);
		int count = 0;
		for (String filepath : filepaths) {
			AllCategoryImages categoryImage = new AllCategoryImages();
			categoryImage.setId(String.valueOf(ALPHABETS[count]));
			categoryImage.setImage(_getImageByteArrayFromAbsoluteFilePath(filepath));
			categoryImage.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(filepath));
			list.add(categoryImage);
			count += 1;
		}
		// AllCategoryImages categoryImage1 = new AllCategoryImages();
		// categoryImage1.setId("a");
		// categoryImage1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"1a.png"));
		// AllCategoryImages categoryImage2 = new AllCategoryImages();
		// categoryImage2.setId("b");
		// categoryImage2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"1b.png"));
		//
		// list.add(categoryImage1); list.add(categoryImage2);

		// Category 2 neckline
		List<AllCategoryImages> list2 = new ArrayList<>();
		directoryPathInResources = BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "neckline";
		filepaths = getSortedFilePathsInDir(directoryPathInResources);
		count = 0;
		for (String filepath : filepaths) {
			AllCategoryImages categoryImage = new AllCategoryImages();
			categoryImage.setId(String.valueOf(ALPHABETS[count]));
			categoryImage.setImage(_getImageByteArrayFromAbsoluteFilePath(filepath));
			categoryImage.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(filepath));
			list2.add(categoryImage);
			count += 1;
		}
		// AllCategoryImages category2Image1 = new AllCategoryImages();
		// category2Image1.setId("a");
		// category2Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"2a.png"));
		// AllCategoryImages category2Image2 = new AllCategoryImages();
		// category2Image2.setId("b");
		// category2Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"2b.png"));
		//
		// list2.add(category2Image1); list2.add(category2Image2);

		// Category 3 backline
		List<AllCategoryImages> list3 = new ArrayList<>();
		directoryPathInResources = BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "backline";
		filepaths = getSortedFilePathsInDir(directoryPathInResources);
		count = 0;
		for (String filepath : filepaths) {
			AllCategoryImages categoryImage = new AllCategoryImages();
			categoryImage.setId(String.valueOf(ALPHABETS[count]));
			categoryImage.setImage(_getImageByteArrayFromAbsoluteFilePath(filepath));
			categoryImage.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(filepath));
			list3.add(categoryImage);
			count += 1;
		}
		// AllCategoryImages category3Image1 = new AllCategoryImages();
		// category3Image1.setId("a");
		// category3Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"3a.png"));
		// AllCategoryImages category3Image2 = new AllCategoryImages();
		// category3Image2.setId("b");
		// category3Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"3b.png"));
		//
		// list3.add(category3Image1); list3.add(category3Image2);

		// Category 4 sleeve
		List<AllCategoryImages> list4 = new ArrayList<>();
		directoryPathInResources = BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "sleeve";
		filepaths = getSortedFilePathsInDir(directoryPathInResources);
		count = 0;
		for (String filepath : filepaths) {
			AllCategoryImages categoryImage = new AllCategoryImages();
			categoryImage.setId(String.valueOf(ALPHABETS[count]));
			categoryImage.setImage(_getImageByteArrayFromAbsoluteFilePath(filepath));
			categoryImage.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(filepath));
			list4.add(categoryImage);
			count += 1;
		}
		// AllCategoryImages category4Image1 = new AllCategoryImages();
		// //category4Image1.setId("");
		// category4Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+""));
		// AllCategoryImages category4Image2 = new AllCategoryImages();
		// category4Image2.setId("b");
		// category4Image2.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+"4b.png"));
		//
		// //list4.add(category4Image1);
		// list4.add(category4Image2);

		// Category 5
		List<AllCategoryImages> list5 = new ArrayList<>();
		AllCategoryImages category5Image1 = new AllCategoryImages();
		// category5Image1.setId("");
		// category5Image1.setImage(_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES+""));
		AllCategoryImages category5Image2 = new AllCategoryImages();
		category5Image2.setId("b");
		category5Image2.setImage(
				_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5b.png"));
		category5Image2.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5b.png"));
		AllCategoryImages category5Image3 = new AllCategoryImages();
		//TODO Jugaad
		category5Image3.setId("a");
		category5Image3.setImage(
				_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5c.png"));
		category5Image3.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5c.png"));

		// list5.add(category5Image1);
		
		list5.add(category5Image3);
		list5.add(category5Image2);

		// Category 6
		List<AllCategoryImages> list6 = new ArrayList<>();
		AllCategoryImages category6Image1 = new AllCategoryImages();
		//TODO Jugaad
		category6Image1.setId("a");
		category6Image1.setImage(
          _getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5c.png"));
		category6Image1.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5c.png"));
		AllCategoryImages category6Image2 = new AllCategoryImages();
		category6Image2.setId("b");
		category6Image2.setImage(
				_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "6b.png"));
		category6Image2.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "6b.png"));

		list6.add(category6Image1);
		list6.add(category6Image2);

		// Category 7
		List<AllCategoryImages> list7 = new ArrayList<>();
		AllCategoryImages category7Image1 = new AllCategoryImages();
		//TODO Jugaad
		category7Image1.setId("a");
		category7Image1.setImage(
          _getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5c.png"));
		category7Image1.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "5c.png"));
		AllCategoryImages category7Image2 = new AllCategoryImages();
		category7Image2.setId("b");
		category7Image2.setImage(
				_getImageByteArrayFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "7b.png"));
		category7Image2.setS3ImagePath(_getS3ImagPathFromFilePathInResourceFolder(BASE_PATH_FOR_CATEGORY_IMAGES_IN_RESOURCES + "7b.png"));

		list7.add(category7Image1);
		list7.add(category7Image2);

		map.put("0", list);
		map.put("1", list2);
		map.put("2", list3);
		map.put("3", list4);
		map.put("4", list5);
		map.put("5", list6);
		map.put("6", list7);

		return map;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.example.service.IItemService#getStaticMapOfAllCategoryImages()
	 */
	@Override
	@Cacheable("test")
	public Map<String, List<AllCategoryImages>> getStaticMapOfAllCategoryImages() {
		int size = mapOfAllCategoryImages.size();
		// TODO Auto-generated method stub
		return mapOfAllCategoryImages;
	}

	private void loadMapOfParamterAndImagesFolder() {

		// Map<String, String> encodedStringWithFolderPathMap = new HashMap<String,
		// String>();
		String csvFile = FILE_PATH_PARAMETER_TO_IMAGES_FOLDER_MAP_IN_RESOURCES;
		String line = "";
		String cvsSplitBy = ",";
		try (BufferedReader br = new BufferedReader(new InputStreamReader(
				new FileInputStream(this.getClass().getClassLoader().getResource(csvFile).getFile())))) {

			while ((line = br.readLine()) != null) {
				String[] tokens = line.split(cvsSplitBy);
				// System.out.println((tokens.length >=0 ? tokens[0]:"Null"));
				// System.out.println((tokens.length >=2 ? tokens[1]+" :
				// "+putHyphens(tokens[1]):"Null"));
				// System.out.println("Country [code= " + tokens[0] + " , name=" + tokens[1] +
				// "]");
				if (tokens.length >= 2) {
					if (tokens[0] != null && tokens[1] != null) {
						mapOfParamterAndImagesFolder.put(tokens[0], putHyphens(tokens[1]));
					}
				}

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private String putHyphens(String withoutHypenString) {
		// eg 3BACBA, 3BA2BA
		StringBuilder withHypen = new StringBuilder();
		if (!Character.isDigit(withoutHypenString.charAt(0))) {
			withHypen.append('1');
		}
		withHypen.append(withoutHypenString.charAt(0));
		for (int i = 1; i < withoutHypenString.length(); i++) {
			if (Character.isLetter(withoutHypenString.charAt(i - 1))) {
				withHypen.append('-');
				if (!Character.isDigit(withoutHypenString.charAt(i))) {
					withHypen.append('1');
				}
			}
			withHypen.append(withoutHypenString.charAt(i));
		}
		return withHypen.toString();
	}

	private List<String> getResourceFilePaths(String imageFolderName) throws IOException {
		String prefix = "all_model_files_optimised/";
		String path = prefix + imageFolderName;
		List<String> filenames = new ArrayList<>();
		System.out.println("path " + path);
		try {
			// System.out.println("path "+path);

			InputStream in = this.getClass().getClassLoader().getResourceAsStream(path);
			if (in != null) {
				BufferedReader br = new BufferedReader(new InputStreamReader(in));

				String resource;

				while ((resource = br.readLine()) != null) {
					filenames.add(path + "/" + resource);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		// )
		return filenames;
	}

	public String pickOneFromFilteredList(List<String> filtered) {

		if (filtered.size() == 1) {
			return filtered.get(0);
		}
		if (filtered.size() >= 2 && (filtered.get(0)).toLowerCase().contains("with")) {
			for (String filename : filtered) {
				if (!filename.toLowerCase().contains("out")) {
					return filename;
				}
			}
		}
		Collections.sort(filtered);
		return filtered.get(filtered.size() - 1);
	}

	public String getFrontImage(List<String> filenames) {
		List<String> filtered = new ArrayList<String>();
		if(filenames!= null){
	        for (String filename : filenames) {
	            if (filename.contains("FR") || filename.contains("F1")) {
	                filtered.add(filename);
	            }
	        }
	        if (!filtered.isEmpty()) {
	            return pickOneFromFilteredList(filtered);
	        } else {
	            for (String filename : filenames) {
	                if (filename.contains("(5)")) {
	                    return filename;
	                }
	            }	          
	        }
		}
		return "fabricImages/1A-1B-1A-1B-1A-1B-1A_F1_optimized.png";
	}

	public String getBackImage(List<String> filenames) {
		List<String> filtered = new ArrayList<String>();
		if(filenames!= null){
	        for (String filename : filenames) {
	            if (filename.contains("BA") || filename.contains("BK1")) {
	                filtered.add(filename);
	            }
	        }
	        if (!filtered.isEmpty()) {
	            return pickOneFromFilteredList(filtered);
	        } else {
              for (String filename : filenames) {
                if (filename.contains("(4)")) {
                    return filename;
                }
            }   	          
	        }
		}
		return "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
	}

	public String getLeftImage(List<String> filenames) {
		List<String> filtered = new ArrayList<String>();
		if(filenames!= null){
	        for (String filename : filenames) {
	            if (filename.contains("LE") || filename.contains("L1")) {
	                filtered.add(filename);
	            }
	        }
	        if (!filtered.isEmpty()) {
	            return pickOneFromFilteredList(filtered);
	        }		  
		}
		return "fabricImages/1A-1B-1A-1B-1A-1B-1A_L1_optimized.png";
	}

	private void writeToCsvFromMap(String filename, Map<String, List<String>> paramterToFilenames) {
	  PrintWriter pw = null;
	  try {
//	      File file = new File("src/main/resources/"+filename);
//	      System.out.println("Absolute file PAth : "+file.getAbsolutePath());
//	      if(file.exists()){
//	        return;
//	      }
//	      pw = new PrintWriter(new File(filename));
	      FileWriter file = new FileWriter("src/main/resources/"+filename);
	      
	      
	      BufferedWriter writer = new BufferedWriter(
	                                    new OutputStreamWriter(
	                                         new FileOutputStream("src/main/resources/"+filename), "utf-8"));
	      ///Users/anuragverma/Documents/freelancing/fabric/
	  StringBuilder builder = new StringBuilder();
	  System.out.println("size of map"+ paramterToFilenames.size());
	  for(String key: paramterToFilenames.keySet()){
	    for(String value: paramterToFilenames.get(key)){
//	          builder.append(key);
//	          builder.append(",");
//	          builder.append(value);
//	          builder.append('\n');     	      
	          writer.write(key);
	          writer.write(",");
	          writer.write(value);
	          writer.write('\n');               

	    }
	  }
//	  pw.write(builder.toString());
//	  pw.flush();
//	  pw.close();
	  writer.flush();
	  writer.close();
	   } catch (IOException e) {
         e.printStackTrace();
     }

	  System.out.println("writeToCsvFromMap  , FILE_PATH_PARAMETER_TO_IMAGES_FILENAMES_MAP_IN_RESOURCES ");
	}
	
    private void loadMapOfParamterAndImagesFilenames() {

      // Map<String, String> encodedStringWithFolderPathMap = new HashMap<String,
      // String>();
      String csvFile = FILE_PATH_PARAMETER_TO_IMAGES_FILENAMES_MAP_IN_RESOURCES;
      String line = "";
      String cvsSplitBy = ",";
      try (BufferedReader br = new BufferedReader(new InputStreamReader(
              new FileInputStream(this.getClass().getClassLoader().getResource(csvFile).getFile())))) {

          while ((line = br.readLine()) != null) {
              String[] tokens = line.split(cvsSplitBy);

              if (tokens.length >= 2) {
                  if (tokens[0] != null && tokens[1] != null) {
                    String key = tokens[0];
                    String value = tokens[1];
                    if(mapOfParamterToFilenames.containsKey(key)){
                      mapOfParamterToFilenames.get(key).add(value);
                    }
                    List<String> l = new ArrayList<>();
                    l.add(value);
                    mapOfParamterToFilenames.put(key, l);
                  }
              }

          }
          System.out.println("Read from  mapOfParamterToFilenames : size " + mapOfParamterToFilenames.size());
      } catch (IOException e) {
          e.printStackTrace();
      }

  }	
}
