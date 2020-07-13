package com.alan.bookstore.controller;

import com.alan.bookstore.constant.Constant;
import com.alan.bookstore.entity.*;
import com.alan.bookstore.service.BookService;
import com.alan.bookstore.service.CartService;
import com.alan.bookstore.service.OrderService;
import com.alan.bookstore.service.UserService;
import com.alan.bookstore.utils.msgutils.Msg;
import com.alan.bookstore.utils.msgutils.MsgCode;
import com.alan.bookstore.utils.msgutils.MsgUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class OrderController {

    @Autowired
    private BookService bookService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @RequestMapping("/addOrder")
    public Msg addOrder(@RequestBody Map<String,Object> params)
    {
        System.out.println("addOrder");
        System.out.println(params);
        JSONObject jsonObject = JSONObject.fromObject(params);
        Order order = new Order();

        int userId = Integer.parseInt(jsonObject.get(Constant.USER_ID).toString());
        order.setUserId(userId);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        order.setTime(timestamp);

        orderService.addOrder(order);

        int orderId = order.getListId();
        JSONArray jsonArray = jsonObject.getJSONArray(Constant.ITEMS);

        for(int i = 0;i<jsonArray.size();i++)
        {
            JSONObject obj = jsonArray.getJSONObject(i);
            int bookId = Integer.parseInt(obj.get(Constant.BOOK_ID).toString());
            int number = Integer.parseInt(obj.get(Constant.BOOK_NUMBER).toString());
            double price = Double.parseDouble(obj.get(Constant.BOOK_PRICE).toString());

            bookService.buyBook(bookId,number);

            OrderItem orderItem = new OrderItem();
            Book book = new Book();

            book.setBookId(bookId);
            orderItem.setBook(book);
            orderItem.setBookNumber(number);
            orderItem.setOrderId(orderId);
            orderItem.setBookPrice(price);
            orderService.addOrderItem(orderItem);
        }
        return MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.BUY_SUCCESS_MSG);
    }

    @RequestMapping("/addCart")
    public Msg addCart(@RequestBody Map<String,String> params)
    {
        System.out.println("addCart");
        System.out.println(params);

        JSONObject jsonObject = JSONObject.fromObject(params);
        CartItem cartItem = new CartItem();
        int userId = Integer.parseInt(jsonObject.get(Constant.USER_ID).toString());
        cartItem.setUserId(userId);
        int bookId = Integer.parseInt(jsonObject.get(Constant.BOOK_ID).toString());
        Book book = bookService.findBookById(bookId);
        cartItem.setBook(book);
        int bookNumber = Integer.parseInt(jsonObject.get("bookNumber").toString());
        cartItem.setBookNumber(bookNumber);
//        double bookPrice = Double.parseDouble(jsonObject.get(Constant.BOOK_PRICE).toString());
        double bookPrice = book.getPrice();
        cartItem.setBookPrice(bookPrice);
        cartService.addCart(cartItem);
        return MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.ADD_SUCCESS_MSG);
    }

    @RequestMapping("/delCartItem")
    public Msg delCartItem(@RequestBody Map<String, String> params)
    {
        System.out.println("delCartItem");
        JSONObject jsonObject = JSONObject.fromObject(params);
        int cartItemId = Integer.parseInt(jsonObject.get("id").toString());
        cartService.delCartItemById(cartItemId);
        return MsgUtil.makeMsg(MsgCode.SUCCESS,MsgUtil.DELETE_SUCCESS_MSG);
    }

    @RequestMapping("/getAllOrders")
    public List<Order> getAllOrders() {
        System.out.println("getAllOrders");
        List<User> users = userService.findAllUsers();
        List<Order> orders = new ArrayList<>();
        for(User user:users){
            List<Order> userOrders = user.getOrders();
            orders.addAll(userOrders);
        }
        return orders;
    }

    @RequestMapping("/editCartItemNumber")
    public Msg editCartItemNumber(@RequestBody Map<String, String> params) {
        System.out.println("editCartItemNumber");
        Integer itemId = Integer.valueOf(params.get("itemId"));
        int bookNumber = Integer.parseInt(params.get("bookNumber"));
        CartItem cartItem = cartService.getCartItemById(itemId);
        cartItem.setBookNumber(bookNumber);
        cartService.save(cartItem);
        return MsgUtil.makeMsg(MsgCode.SUCCESS);
    }

    @RequestMapping("/getOrders")
    public List<Order> getOrders(@RequestBody Map<String, String> params) {
        System.out.println("getOrders");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID));
        return userService.getOrders(userId);
    }

    @RequestMapping("/getCart")
    public List<CartItem> getCart(@RequestBody Map<String, String> params) {
        System.out.println("getCart");
        Integer userId = Integer.valueOf(params.get(Constant.USER_ID));
        User user = userService.getUserById(userId);
        return user.getCart();
    }
}



