package com.alan.bookstore.dao.daoimpl;

import com.alan.bookstore.dao.CartDao;
import com.alan.bookstore.entity.CartItem;
import com.alan.bookstore.entity.User;
import com.alan.bookstore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    private CartRepository cartRepository;

    @Override
    public void deleteCartItem(Integer id) {
        cartRepository.deleteById(id);
    }

    @Override
    public void addCartItem(CartItem cartItem) {
        CartItem item = cartRepository.findCartItemByBookAndUserId(cartItem.getBook(),cartItem.getUserId());
        if(item == null){
            cartRepository.saveAndFlush(cartItem);
        }
        else{
            item.setBookNumber(item.getBookNumber()+cartItem.getBookNumber());
            cartRepository.saveAndFlush(item);
        }

    }

    @Override
    public CartItem getCartItemById(Integer cartId){
        return cartRepository.getOne(cartId);
    }

    @Override
    public void save(CartItem cartItem){
        cartRepository.saveAndFlush(cartItem);
    }
}
