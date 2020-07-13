package com.alan.bookstore.service.serviceimpl;

import com.alan.bookstore.dao.CartDao;
import com.alan.bookstore.entity.CartItem;
import com.alan.bookstore.entity.User;
import com.alan.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Override
    public void addCart(CartItem cartItem) {
        cartDao.addCartItem(cartItem);
    }

    @Override
    public CartItem getCartItemById(Integer cartId)
    {
        return cartDao.getCartItemById(cartId);
    }

    @Override
    public void delCartItemById(Integer cartId){cartDao.deleteCartItem(cartId);
    }

    @Override
    public void save(CartItem cartItem)
    {
        cartDao.save(cartItem);
    }
}
