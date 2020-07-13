package com.alan.bookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Column;

@Document(collection = "user")
public class UserIcon {

    @Id
    @Column(name = "_id")
    private Integer userId;

    @Field("icon")
    private String icon;

    public UserIcon(Integer id, String icon) {
        this.userId = id;
        this.icon = icon;
    }

    public String getIcon() {
        return this.icon;
    }
    public void setIcon(String icon) {
        this.icon = icon;
    }
}
