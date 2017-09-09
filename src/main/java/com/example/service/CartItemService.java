/**
 * @author Anurag
 * @description 
 */
package com.example.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.CartItem;
import com.example.model.Item;
import com.example.model.Measurement;
import com.example.model.ProductOrder;
import com.example.model.User;
import com.example.repository.ICartItemRepository;
import com.example.repository.IProductOrderRepository;
import com.example.repository.UserRepository;

/**
 * @author Anurag
 * @description 
 */
@Service("cartItemService")
public class CartItemService implements ICartItemService {

  @Autowired
  private ICartItemRepository cartItemRepository;
  
  @Autowired
  private UserRepository userRepository;
  
  @Autowired
  private IItemService itemService;
  
  @Autowired
  private IMeasurementService measurementService;
  
  @Autowired
  private IProductOrderRepository productOrderRepository;
  
  @PostConstruct
  public void init(){
    createSampleData();
  }
  
  @Override
  public Boolean saveCartItem(CartItem cartItem) {
    try
    {
      cartItemRepository.save(cartItem);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return false;
    }
    return true;
  }

  @Override
  public CartItem saveAndGetCartItem(CartItem cartItem) {
    
    return cartItemRepository.save(cartItem);
  }

  @Override
  public Boolean saveCartItem(List<CartItem> cartItems) {
    try
    {
      cartItemRepository.save(cartItems);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        return false;
    }
    return true;
  }

  @Override
  public List<CartItem> saveAndGetCartItem(List<CartItem> cartItems) {
    
    return cartItemRepository.save(cartItems);
  }

  @Override
  public List<CartItem> findByUserId(int userId) {
    
    return cartItemRepository.findByUserId(userId);
  }

  @Override
  public List<CartItem> findByUserIdAndPaymentNotDone(int userId) {
    
    boolean paymentDone = false;
    return cartItemRepository.findByUserIdAndPaymentDone(userId, paymentDone);
  }

  @Override
  public List<CartItem> findByUserIdAndPaymentDone(int userId) {
    
    boolean paymentDone = true;
    return cartItemRepository.findByUserIdAndPaymentDone(userId, paymentDone);
  }

  @Override
  public List<CartItem> findByIdIn(List<Integer> cartItemIds) {
    return cartItemRepository.findByIdIn(cartItemIds);
  }
  @Override
  public void createSampleData() {
    
    if(cartItemRepository.findAll().size() <= 1) {
      
      
      User user =  new User();
      String email = "coolamazone@gmail.com"; 
      if(userRepository.findByEmail(email).isEmpty()){
        user.setEmail(email); user.setActive(1);
        user.setName("Anurag"); user.setLastName("Verma");
        user.setPassword("123456");
        userRepository.save(user);
      }else{
        user = userRepository.findByEmail(email).get(0);
      }
      
      Measurement measurement = new Measurement();
      String firstMT = "106"; String secondMT = "84";
      if(measurementService.findByFirstMTAndSecondMT(firstMT, secondMT).isEmpty()){
        measurement.setFirstMT(firstMT); measurement.setSecondMT(secondMT); 
        measurement.setType("online"); measurement.setUserId(user.getId());
        measurementService.saveAndGetMeasurement(measurement);        
      }else{
        measurement = measurementService.findByFirstMTAndSecondMT(firstMT, secondMT).get(0);
      }
      
      Item item = itemService.saveSampleItem();
      
      //Cart Item which isn't ordered yet
      CartItem cartItem = new CartItem();
      cartItem.setItemId(item.getId()); cartItem.setMeasurement(measurement);
      cartItem.setPaymentDone(false); cartItem.setQty(1);
      cartItem.setUserId(user.getId()); 
      saveAndGetCartItem(cartItem);
      
      
      //Cart Item which is ordered and payment done
          
      CartItem cartItem2 = new CartItem();
      cartItem2.setItemId(item.getId()); cartItem2.setMeasurement(measurement);
      cartItem2.setQty(2);
      cartItem2.setUserId(user.getId()); 
      saveCartItem(cartItem2);
      System.out.println(cartItem2);
      
      ProductOrder productOrder = new ProductOrder();
      productOrder.setCity("Delhi"); productOrder.setUserId(user.getId());
      List<CartItem> cartItems = new ArrayList<>(); cartItems.add(cartItem2);
      productOrder.setCartItems(cartItems);
      productOrderRepository.save(productOrder);
      System.out.println(productOrder);
      
      cartItem2.setPaymentDone(true);
      cartItem2.setProductOrder(productOrder);
      saveCartItem(cartItem2);
      //System.out.println(" Saving it again \n"+cartItem2);
      System.out.println(" Saving it again \n");
      System.out.println(cartItem2.getProductOrder().getId());
    }
  }

  
}
