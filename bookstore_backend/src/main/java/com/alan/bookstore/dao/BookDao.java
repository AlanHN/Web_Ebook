package com.alan.bookstore.dao;

import com.alan.bookstore.entity.Book;

import java.util.List;

public interface BookDao {

    Book findOne(Integer id);

    List<Book> getBooks();

    void buyBook(Integer bookId,Integer number);

    void deleteBook(Integer bookId);

    void addBook(Book book);
}
