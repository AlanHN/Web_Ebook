package com.alan.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "book")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "bookId")
public class Book {

    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    private String isbn;
    private String title;
    private String type;
    private String author;
    private Double price;
    private Integer stock;

    @Transient
    private String description;

    @Transient
    private String image;

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public void setDescription(String description) {
        this.description =description;
    }

    public Integer getBookId() {
        return this.bookId;
    }

    public Integer getStock() {
        return this.stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return this.description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setType(String type) {
        this.type =  type;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return this.image;
    }

    public double getPrice() {
        return this.price;
    }
}
