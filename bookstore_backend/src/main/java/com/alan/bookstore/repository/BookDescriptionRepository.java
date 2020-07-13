package com.alan.bookstore.repository;

import com.alan.bookstore.entity.BookDescription;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "book", path = "book")
public interface BookDescriptionRepository extends MongoRepository<BookDescription, Integer> {
}
