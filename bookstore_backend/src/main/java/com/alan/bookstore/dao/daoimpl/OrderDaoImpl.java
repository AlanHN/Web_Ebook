package com.alan.bookstore.dao.daoimpl;

import com.alan.bookstore.dao.OrderDao;
import com.alan.bookstore.entity.Order;
import com.alan.bookstore.entity.OrderItem;
import com.alan.bookstore.repository.OrderItemRepository;
import com.alan.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    public void addOrder( Order order)
    {
        orderRepository.saveAndFlush(order);
    }

    public void addOrderItem( OrderItem orderItem)
    {
        orderItemRepository.saveAndFlush(orderItem);
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }
}
