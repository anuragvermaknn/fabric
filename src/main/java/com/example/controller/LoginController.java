package com.example.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.bean.AllCategoryImages;
import com.example.bean.ModelBean;
import com.example.bean.ParameterBean;
import com.example.model.Item;
import com.example.model.User;
import com.example.service.IItemService;
import com.example.service.UserService;

@Controller
@CrossOrigin(value = "*", origins = "*")
public class LoginController
{

	@Autowired
	private UserService userService;

	@Autowired
	private IItemService itemService;
	private ParameterBean parameterBean1 = new ParameterBean("A", "B", "A", "B", "A", "B", "A");

	@RequestMapping(value = { "/login" }, method = RequestMethod.GET)
	public ModelAndView login()
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("login");
		return modelAndView;
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView getHomePage1(@RequestHeader("User-Agent") String userAgent)
	{
		ModelAndView modelAndView = new ModelAndView();
		if (userAgent.contains("MSIE 8") || userAgent.contains("MSIE 7") || userAgent.contains("MSIE 6"))
		{
			modelAndView.setViewName("indexIE8");

		}
		else
		{
			modelAndView.setViewName("assets/index");

		}
		return modelAndView;
	}

	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public ModelAndView registration()
	{
		ModelAndView modelAndView = new ModelAndView();
		User user = new User();
		modelAndView.addObject("user", user);
		modelAndView.addObject("roleAdd", userService.findAllRoles());
		modelAndView.addObject("user", user);
		modelAndView.setViewName("registration");
		return modelAndView;
	}

	@RequestMapping(value = "/registration", method = RequestMethod.POST)
	public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult)
	{
		ModelAndView modelAndView = new ModelAndView();
		User userExists = userService.findUserByEmail(user.getEmail());
		if (userExists != null)
		{
			bindingResult.rejectValue("email", "error.user",
					"There is already a user registered with the email provided");
		}
		if (bindingResult.hasErrors())
		{
			modelAndView.setViewName("registration");
		}
		else
		{
			userService.saveUser(user);
			modelAndView.addObject("successMessage", "User has been registered successfully");
			modelAndView.addObject("user", new User());
			modelAndView.setViewName("registration");

		}
		return modelAndView;
	}

	@RequestMapping(value = "/admin/home", method = RequestMethod.GET)
	public ModelAndView home()
	{
		ModelAndView modelAndView = new ModelAndView();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.findUserByEmail(auth.getName());
		modelAndView.addObject("userName",
				"Welcome " + user.getName() + " " + user.getLastName() + " (" + user.getEmail() + ")");
		modelAndView.addObject("adminMessage", "Content Available Only for Users with Admin Role");
		modelAndView.setViewName("admin/home");
		return modelAndView;
	}

	@RequestMapping(value = "/sample-image", method = RequestMethod.GET, produces = "image/png")
	public @ResponseBody byte[] getFile()
	{
		System.out.println(" sample image controller");
		try
		{

			String sampleImagePath = "fabricImages/1A-1B-1A-1B-1A-1B-1A_BK1_optimized.png";
			// Retrieve image from the classpath.
			InputStream is = this.getClass().getClassLoader().getResourceAsStream(sampleImagePath);

			// Prepare buffered image.
			BufferedImage img = ImageIO.read(is);

			// Create a byte array output stream.
			ByteArrayOutputStream bao = new ByteArrayOutputStream();

			// Write to output stream
			ImageIO.write(img, "png", bao);

			return bao.toByteArray();
		}
		catch (IOException e)
		{
			// logger.error(e);
			throw new RuntimeException(e);
		}
	}

	// @RequestMapping(value = "/inventorydtoragedays/customer", method =
	// RequestMethod.GET)
	// public ResponseEntity<List<InventoryStorageDaysForMonth>>
	// findInventoryStorageDaysForMonthByCustomerID()
	// {
	// String customerID = "1";
	// List<InventoryStorageDaysForMonth> results = inputTxnService
	// .findInventoryStorageDaysForMonthByCustomerID(customerID, new Date());
	// ResponseEntity<List<InventoryStorageDaysForMonth>> responseEntity = new
	// ResponseEntity<>(results,
	// HttpStatus.OK);
	// return responseEntity;
	// }

	// 3d model api

	@RequestMapping(value = "/data/image", method = RequestMethod.POST)
	public ResponseEntity<ModelBean> getImageByteArrayFromParameterBean(@RequestBody ParameterBean parameterBean)
	{

		ModelBean model = new ModelBean();
		System.out.println(" ParameterBean values that hit the api \n "+ parameterBean);
		// TODO change parameterBean1 to parameterBean below
		// byte[] imageStream =
		// itemService.getImageByteArrayFromParameterBean(parameterBean1);

		// Map<String, byte[]> viewImages = new HashMap<>();
		//
		// viewImages.put("left", imageStream);
		// viewImages.put("right", imageStream);
		// viewImages.put("front", imageStream);

		Map<String, byte[]> viewImages = itemService.getImageByteArrayFromParameterBean(parameterBean);

		model.setViewImages(viewImages);

		ResponseEntity<ModelBean> responseEntity = new ResponseEntity<>(model, HttpStatus.OK);
		return responseEntity;
		// return model;

	}

	// All categories second part data with mapping

	@RequestMapping(value = "/get/AllCategroies/data", method = RequestMethod.GET)
	public ResponseEntity<Map<String, List<AllCategoryImages>>> getCategoryImageByteArrayFromParameterBean()
	{

		// Map<String, List<AllCategoryImages>> map = new HashMap<>();
		// TODO change parameterBean1 to parameterBean below
		// byte[] imageStream =
		// itemService.getImageByteArrayFromParameterBean(parameterBean1).get("front");
		//
		// for (int i = 0; i < 3; i++)
		// {
		// AllCategoryImages allCategoryImages = new AllCategoryImages();
		// allCategoryImages.setId(i + "");
		// allCategoryImages.setImage(imageStream);
		// list.add(allCategoryImages);
		//
		// }
		//
		// for (int j = 0; j < 7; j++)
		// {
		//
		// map.put(j + "", list);
		// }

		Map<String, List<AllCategoryImages>> map = itemService.getStaticMapOfAllCategoryImages();
		ResponseEntity<Map<String, List<AllCategoryImages>>> responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
		return responseEntity;
	}

	// TODO @Navneet fix needed in this controller

	@RequestMapping(value = "/data/category/image2", method = RequestMethod.GET)
	public List<byte[]> getCategoryImageByteArrayFromParameterBean2(@RequestBody(required = false) String category)
	{

		// Response Type
		// In this map you have to put beans against each categoryId;
		//
		// like this map.put("categorId1",List<AllCategoryImages>)
		Map<String, List<AllCategoryImages>> map = new HashMap<>();

		// TODO change parameterBean1 to parameterBean below
		byte[] imageStream = itemService.getImageByteArrayFromParameterBean(parameterBean1).get("front");
		List<byte[]> categoryImages = new ArrayList<byte[]>();
		categoryImages.add(imageStream);
		categoryImages.add(imageStream);
		categoryImages.add(imageStream);
		// ResponseEntity<List<byte[]>> responseEntity = new
		// ResponseEntity<>(categoryImages,
		// HttpStatus.OK);
		// return responseEntity;

		return categoryImages;
	}

	@RequestMapping(value = "/data/item", method = RequestMethod.GET)
	public @ResponseBody List<Item> findItemByParameterBean(@RequestBody(required = false) ParameterBean parameterBean)
	{

		// TODO change parameterBean1 to parameterBean below
		List<Item> items = itemService.findByParameterBean(parameterBean1);
		return items;
	}

	// product listing api

	@RequestMapping(value = "/product/items", method = RequestMethod.GET)
	public ResponseEntity<List<AllCategoryImages>> allProductsListing()
	{
		List<AllCategoryImages> result = new ArrayList<>();

		// TODO change parameterBean1 to parameterBean below
		byte[] imageStream = itemService.getImageByteArrayFromParameterBean(parameterBean1).get("front");

		for (int i = 0; i < 10; i++)
		{
			AllCategoryImages productImage = new AllCategoryImages();
			int k = (i + 1);
			productImage.setId("id-" + k);
			productImage.setProductId("productId" + k);
			productImage.setImage(imageStream);
			result.add(productImage);

		}

		ResponseEntity<List<AllCategoryImages>> responseEntity = new ResponseEntity<>(result, HttpStatus.OK);
		return responseEntity;
	}

}
