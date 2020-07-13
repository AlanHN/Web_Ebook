package com.alan.bookstore.dao;

import com.alan.bookstore.entity.CartItem;
import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.User;

import java.util.List;

public interface UserDao {
    User checkUser(String username, String password);

    void addUser(User user);

    User getUserById(int userId);

    List<Order> getOrders(int userId);

    List<CartItem> getCart(int userId);

    List<User> getUsers();

    void setUserType(Integer userId, Integer userType);

    void deleteUser(Integer userId);
}
