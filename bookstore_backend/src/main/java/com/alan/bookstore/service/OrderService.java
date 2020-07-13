package com.alan.bookstore.service;

import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.OrderItem;

import java.util.List;

public interface OrderService {
    void addOrder(Order order);
    void addOrderItem(OrderItem orderItem);

    List<Order> getAllOrders();
}
