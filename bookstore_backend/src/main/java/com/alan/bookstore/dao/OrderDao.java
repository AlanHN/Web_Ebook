package com.alan.bookstore.dao;

import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderDao {
    void addOrder(Order order);
    void addOrderItem(OrderItem orderItem);

    List<Order> getAllOrders();
}
