package com.alan.bookstore.controller;

import com.alan.bookstore.constant.Constant;
import com.alan.bookstore.entity.Book;
import com.alan.bookstore.service.BookService;
import com.alan.bookstore.utils.msgutils.Msg;
import com.alan.bookstore.utils.msgutils.MsgCode;
import com.alan.bookstore.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks() {
        System.out.println("getBooks");
        return bookService.findAllBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id) {
        System.out.println("getBook: " + id);
        return bookService.findBookById(id);
    }

    @RequestMapping("/deleteBook")
    public Msg deleteBook(@RequestParam("id") Integer id) {
        System.out.println("deleteBook: " + id);
        bookService.deleteBookById(id);
        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.DELETE_SUCCESS_MSG);
    }

    @RequestMapping("/addBook")
    public Msg addBook(@RequestBody Map<String, String> params) {
        System.out.println("addBook:");
        System.out.println(params);

        //读json
        String title = params.get(Constant.TITLE);
        String isbn = params.get(Constant.ISBN);
        String author = params.get(Constant.AUTHOR);
        Double price = Double.valueOf(params.get(Constant.PRICE));
        String description = params.get(Constant.DESCRIPTION);
        int stock = Integer.parseInt(params.get(Constant.STOCK));
        String image = params.get(Constant.IMAGE);

        //组装book
        Book book = new Book();
        book.setTitle(title);
        book.setIsbn(isbn);
        book.setType("test");
        book.setAuthor(author);
        book.setPrice(price);
        book.setStock(stock);
        book.setImage(image);
        book.setDescription(description);

        //调用下层保存记录
        bookService.addBook(book);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.ADD_SUCCESS_MSG);
    }

    @RequestMapping("/editBook")
    public Msg editBook(@RequestBody Map<String, String> params) {
        System.out.println("editBook:");
        //读json
        System.out.println(params);
        Integer bookId = Integer.valueOf(params.get(Constant.BOOK_ID));
        String title = params.get(Constant.TITLE);
        String isbn = params.get(Constant.ISBN);
        String author = params.get(Constant.AUTHOR);
        Double price = Double.valueOf(params.get(Constant.PRICE));
        String description = params.get(Constant.DESCRIPTION);
        int stock = Integer.parseInt(params.get(Constant.STOCK));
        String image = params.get(Constant.IMAGE);

        //组装book
        Book book = bookService.findBookById(bookId);
        book.setTitle(title);
        book.setIsbn(isbn);
        book.setAuthor(author);
        book.setPrice(price);
        book.setStock(stock);
        book.setImage(image);
        book.setDescription(description);

        //调用下层保存记录
        bookService.addBook(book);

        return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.ADD_SUCCESS_MSG);
    }

}
