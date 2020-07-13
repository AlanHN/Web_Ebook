package com.alan.bookstore.dao.daoimpl;

import com.alan.bookstore.dao.UserDao;
import com.alan.bookstore.entity.*;
import com.alan.bookstore.repository.UserIconRepository;
import com.alan.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao{

    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserIconRepository userIconRepository;

    @Override
    public User checkUser(String username, String password){
        User user = userRepository.checkUser(username,password);
//        Optional<UserIcon> icon = userIconRepository.findById(user.getUserId());
//        if (icon.isPresent()){
//            user.setIcon(icon.get().getIcon());
//        }
//        else{
//            user.setIcon(null);
//        }
        return user;
    }

    @Override
    public void  addUser(User user)
    {
        userRepository.saveAndFlush(user);
    }

    @Override
    public List<Order> getOrders(int userId){
         User user = userRepository.getUserByUserId(userId);
         return  user.getOrders();
    }

    @Override
    public List<CartItem> getCart(int userId){
        User user = userRepository.getUserByUserId(userId);
        return  user.getCart();
    }

    @Override
    public User getUserById(int userId){
        User user = userRepository.getOne(userId);
//        Optional<UserIcon> icon = userIconRepository.findById(userId);
//        if (icon.isPresent()){
//            user.setIcon(icon.get().getIcon());
//        }
//        else{
//            user.setIcon(null);
//        }
        return user;
    }

    @Override
    public List<User> getUsers()
    {
        List<User> users = userRepository.getUsers();
//        for (User user: users
//        ) {
//            Integer id = user.getUserId();
//            Optional<UserIcon> icon = userIconRepository.findById(id);
//            if (icon.isPresent()){
//                user.setIcon(icon.get().getIcon());
//            }
//            else{
//                user.setIcon(null);
//                System.out.println("noIcon");
//            }
//        }
        List<User> ret = new ArrayList<>();
        for (User user: users
        ) {
            if(user.getUserType()!=-2)
            {
                ret.add(user);
            }
        }
        return ret;
    }

    public void deleteUser(Integer userId)
    {
        User user = userRepository.getOne(userId);
        user.setUserType(-2);
        userRepository.saveAndFlush(user);
    }

    @Override
    public void setUserType(Integer userId, Integer userType)
    {
        userRepository.setUserType(userId,userType);
    }
}
