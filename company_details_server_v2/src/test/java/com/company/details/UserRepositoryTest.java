package com.company.details;

import com.company.details.entity.User;
import com.company.details.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;


import static com.company.details.entity.Role.USER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@DataJpaTest
    public class UserRepositoryTest {

        @Autowired
        private UserRepository userRepository;

        private PasswordEncoder passwordEncoder;

        @Test
        public void testSaveUser() {
            // Create a sample user
            User user = new User();
            user.setFirstName("First name");
            user.setLastName("Last Name");
            user.setEmail("test@example.com");
            user.setPassword(passwordEncoder.encode("password123"));
            user.setRole(USER);

            // Save the user
            User savedUser = userRepository.save(user);

            // Verify that the saved user has an ID assigned
            assertNotNull(savedUser.getUserId());
            assertEquals(user.getFirstName(), savedUser.getFirstName());
            assertEquals(user.getLastName(), savedUser.getLastName());
            assertEquals(user.getEmail(), savedUser.getEmail());
//            assertEquals(user.getPassword(), savedUser.getPassword());
        }
}
