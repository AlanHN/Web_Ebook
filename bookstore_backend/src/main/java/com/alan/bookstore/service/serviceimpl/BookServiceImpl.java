package com.alan.bookstore.service.serviceimpl;

import com.alan.bookstore.dao.BookDao;
import com.alan.bookstore.entity.Book;
import com.alan.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id) {
        return bookDao.findOne(id);
    }

    @Override
    public List<Book> findAllBooks() {
        return bookDao.getBooks();
    }

    public void buyBook(Integer bookId, Integer number) {
        bookDao.buyBook(bookId, number);
    }

    public void addBook(Book book) {
        bookDao.addBook(book);
    }


    public void deleteBookById(Integer bookId) {
        bookDao.deleteBook(bookId);
    }
}
