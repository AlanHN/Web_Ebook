package com.alan.bookstore.service;

import com.alan.bookstore.entity.CartItem;
import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.User;

import java.awt.image.VolatileImage;
import java.util.List;

public interface UserService {

    User checkUser(String username, String password);

    void addUser(User user);

    List<Order> getOrders(Integer userId);

    List<CartItem> getCart(Integer userId);

    User getUserById(Integer userId);

    List<User> findAllUsers();

    void setUserType(Integer userId, Integer userType);

    void deleteUserById(Integer id);
}
