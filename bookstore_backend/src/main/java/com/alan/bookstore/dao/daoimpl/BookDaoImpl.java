package com.alan.bookstore.dao.daoimpl;

import com.alan.bookstore.dao.BookDao;
import com.alan.bookstore.entity.Book;
import com.alan.bookstore.entity.BookDescription;
import com.alan.bookstore.entity.UserIcon;
import com.alan.bookstore.repository.BookDescriptionRepository;
import com.alan.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao{

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookDescriptionRepository bookDescriptionRepository;

    @Override
    public Book findOne(Integer id){

        Book book = bookRepository.getOne(id);
        Optional<BookDescription> bookDescription = bookDescriptionRepository.findById(id);
        if (bookDescription.isPresent()){
            String description = bookDescription.get().getDescription();
            book.setDescription(description);
            String image = bookDescription.get().getImage();
            book.setImage(image);
        }
        else{
            book.setDescription(null);
            book.setImage(null);
        }
        return book;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks();
        for (Book book: books
             ) {
                Integer id = book.getBookId();
                Optional<BookDescription> bookDescription = bookDescriptionRepository.findById(id);
                if (bookDescription.isPresent()){
                    String description = bookDescription.get().getDescription();
                    book.setDescription(description);
                    String image = bookDescription.get().getImage();
                    book.setImage(image);
                }
                else{
                    book.setDescription(null);
                    book.setImage(null);
                }
            }
        List<Book> ret = new ArrayList<>();
        for (Book book: books
             ) {
            if(book.getStock()!=-1)
            {
                ret.add(book);
            }
        }
        return ret;
    }

    public void buyBook(Integer bookId,Integer number){
        Book book = bookRepository.getOne(bookId);
        book.setStock(book.getStock()-number);
        bookRepository.saveAndFlush(book);
    }

    public void deleteBook(Integer bookId)
    {
        //bookRepository.deleteById(bookId);
        //bookDescriptionRepository.deleteById(bookId);
        Book book = bookRepository.getOne(bookId);
        book.setStock(-1);
        bookRepository.saveAndFlush(book);
    }

    public void addBook(Book book)
    {
        bookRepository.saveAndFlush(book);
        bookDescriptionRepository.save(
                new BookDescription(book.getBookId(),book.getDescription(),book.getImage())
        );
    }
}
