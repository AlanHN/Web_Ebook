package com.alan.bookstore.service;

import com.alan.bookstore.entity.Book;
import com.alan.bookstore.entity.CartItem;

import java.util.List;

public interface CartService {
    void addCart(CartItem cartItem);

    CartItem getCartItemById(Integer cartId);

    void delCartItemById(Integer cartId);

    void save(CartItem cartItem);
}
