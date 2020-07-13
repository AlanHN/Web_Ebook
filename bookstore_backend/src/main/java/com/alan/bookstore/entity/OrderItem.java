package com.alan.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_item")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "itemId")
public class OrderItem {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "list_id")
    @Column(name = "list_id")
    private int orderId;

    @OneToOne
    @JoinColumn(name = "book_id")
    private Book book;
    @Column(name = "book_number")
    private int bookNumber;
    private double bookPrice;

    public void setBook(Book book) {
        this.book = book;
    }

    public void setBookNumber(int bookNumber) {
        this.bookNumber = bookNumber;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public void setBookPrice(double price) {
        this.bookPrice = price;
    }
}
