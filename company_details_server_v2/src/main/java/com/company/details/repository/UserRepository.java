package com.company.details.repository;

import com.company.details.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.SqlReturnType;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
