package com.alan.bookstore.service;

import com.alan.bookstore.entity.Book;

import java.util.List;

public interface BookService {

    Book findBookById(Integer id);

    List<Book> findAllBooks();

    void buyBook(Integer bookId,Integer number);

    void addBook(Book book);

    void deleteBookById(Integer bookId);

}
