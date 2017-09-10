package com.example.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.validation.Valid;

import org.dom4j.rule.Mode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
public class LoginController
{

	@Autowired
	private UserService userService;

	@Autowired
	private IItemService itemService;

	@RequestMapping(value = { "/", "/login" }, method = RequestMethod.GET)
	public ModelAndView login()
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("login");
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
			ImageIO.write(img, "jpg", bao);

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

	@RequestMapping(value = "/data/image", method = RequestMethod.GET)
	public ResponseEntity<byte[]> getImageByteArrayFromParameterBean(
			@RequestBody(required = false) ParameterBean parameterBean)
	{

		ModelBean model= new ModelBean();
		ParameterBean parameterBean1 = new ParameterBean("A", "B", "A", "B", "A", "B", "A");
		// TODO change parameterBean1 to parameterBean below
		byte[] imageStream = itemService.getImageByteArrayFromParameterBean(parameterBean1);
		ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(imageStream, HttpStatus.OK);
		return responseEntity;
		//return model;
	
	}

	@RequestMapping(value = "/data/category/image", method = RequestMethod.GET)
	public ResponseEntity<List<byte[]>> getCategoryImageByteArrayFromParameterBean(
			@RequestBody(required = false) String category)
	{

		ParameterBean parameterBean1 = new ParameterBean("A", "B", "A", "B", "A", "B", "A");
		// TODO change parameterBean1 to parameterBean below
		byte[] imageStream = itemService.getImageByteArrayFromParameterBean(parameterBean1);
		List<byte[]> categoryImages = new ArrayList<byte[]>();
		categoryImages.add(imageStream);
		categoryImages.add(imageStream);
		categoryImages.add(imageStream);
		ResponseEntity<List<byte[]>> responseEntity = new ResponseEntity<>(categoryImages, HttpStatus.OK);
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

		ParameterBean parameterBean1 = new ParameterBean("A", "B", "A", "B", "A", "B", "A");
		// TODO change parameterBean1 to parameterBean below
		byte[] imageStream = itemService.getImageByteArrayFromParameterBean(parameterBean1);
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

		ParameterBean parameterBean1 = new ParameterBean("A", "B", "A", "B", "A", "B", "A");
		// TODO change parameterBean1 to parameterBean below
		List<Item> items = itemService.findByParameterBean(parameterBean1);
		return items;
	}

}
