package com.example.service;

import java.util.List;

import com.example.model.Role;
import com.example.model.User;

public interface UserService {
	public User findUserByEmail(String email);
	public void saveUser(User user);
	List<Role> findAllRoles();
}
