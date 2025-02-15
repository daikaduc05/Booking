package org.example.bookingphoto.repository;

import org.example.bookingphoto.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends JpaRepository<User, Integer> {
    User findByUsername (String username);
    @Query(value = "select u.* from User as u where (:username = '' or :username is null or (u.username = :username))", nativeQuery = true)
    User showUsername(@Param("username") String username);
}