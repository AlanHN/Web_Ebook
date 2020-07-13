package com.alan.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cart_item")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class CartItem {

    @Id
    @Column(name="item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @Column(name = "user_id")
    private int userId;

    @OneToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private int bookNumber;
    private double bookPrice;

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public void setBookNumber(int bookNumber) {
        this.bookNumber =bookNumber;
    }

    public void setBookPrice(double bookPrice) {
        this.bookPrice = bookPrice;
    }

    public Book getBook() {
        return book;
    }

    public Integer getUserId() {
        return userId;
    }

    public int getBookNumber() {
        return bookNumber;
    }
}
