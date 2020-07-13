package com.alan.bookstore.repository;

import com.alan.bookstore.entity.Book;
import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {

    @Query(value = "from User where username = :username and password = :password")
    User checkUser(@Param("username") String username, @Param("password") String password);

    User getUserByUserId(Integer userId);

    @Query("select b from User b")
    List<User> getUsers();

    @Query("update User set userType= :userType where userId= :userId")
    void setUserType(@Param("userId") Integer userId, @Param("userType") Integer userType);

}
