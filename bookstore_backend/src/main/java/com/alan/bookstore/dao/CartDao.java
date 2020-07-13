package com.alan.bookstore.dao;

import com.alan.bookstore.entity.CartItem;

import javax.persistence.criteria.CriteriaBuilder;

public interface CartDao {
    void deleteCartItem(Integer id);
    void addCartItem(CartItem cartItem);
    CartItem getCartItemById(Integer cartId);

    void save(CartItem cartItem);
}
