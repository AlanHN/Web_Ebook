package com.alan.bookstore.repository;

import com.alan.bookstore.entity.Book;
import com.alan.bookstore.entity.CartItem;
import com.alan.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem,Integer> {

    CartItem findCartItemByBookAndUserId(Book book,int UserId);
}
