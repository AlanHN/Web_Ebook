package com.alan.bookstore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;

@Data
@Document(collection = "book")
public class BookDescription {

    @Id
    @Column(name = "_id")
    private Integer bookId;

    private String description;

    private String image;

    public BookDescription(Integer bookId, String description,String image)
    {
        this.bookId = bookId;
        this.description = description;
        this.image =image;
    }

    public String getDescription() {
        return this.description;
    }

    public String getImage() {
        return this.image;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
