package com.alan.bookstore.service.serviceimpl;

import com.alan.bookstore.dao.UserDao;
import com.alan.bookstore.entity.CartItem;
import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.User;
import com.alan.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }

    @Override
    public void addUser(User user){
        userDao.addUser(user);
    }

    @Override
    public User getUserById(Integer userId) {
        return userDao.getUserById(userId);
    }

    @Override
    public List<Order> getOrders(Integer userId) {
        return userDao.getOrders(userId);
    }

    @Override
    public List<CartItem> getCart(Integer userId) {
        return userDao.getCart(userId);
    }

    @Override
    public List<User> findAllUsers(){ return userDao.getUsers();}

    @Override
    public void setUserType(Integer userId, Integer userType)
    {
        userDao.setUserType(userId,userType);
    }

    public void deleteUserById(Integer userId) {
        userDao.deleteUser(userId);
    }
}
