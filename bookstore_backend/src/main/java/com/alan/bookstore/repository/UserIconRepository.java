package com.alan.bookstore.repository;

import com.alan.bookstore.entity.UserIcon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserIconRepository extends MongoRepository<UserIcon, Integer> {
}
