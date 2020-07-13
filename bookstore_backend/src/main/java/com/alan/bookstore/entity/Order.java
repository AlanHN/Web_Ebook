package com.alan.bookstore.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.alan.bookstore.entity.OrderItem;
import lombok.Data;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "order_list")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "listId")
public class Order {

    @Id
    @Column(name = "list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int listId;

    @Column(name = "user_id")
    private int userId;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Timestamp time;

    @OneToMany
    @JoinColumn(name = "list_id")
    private List<OrderItem> items;

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setTime(Timestamp timestamp) {
        this.time = timestamp;
    }

    public int getListId() {
        return this.listId;
    }
}
