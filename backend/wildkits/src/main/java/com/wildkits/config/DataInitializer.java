package com.wildkits.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.wildkits.entity.Admin;
import com.wildkits.enums.AdminRole;
import com.wildkits.repository.AdminRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // Check if superadmin already exists
            if (!adminRepository.existsByEmail("superadmin@wildkits.com")) {
                // Hash the password using BCrypt
                String hashedPassword = passwordEncoder.encode("SuperAdmin123?");
                
                Admin superAdmin = Admin.builder()
                        .name("SuperAdmin")
                        .email("superadmin@wildkits.com")
                        .password(hashedPassword)
                        .role(AdminRole.SUPERADMIN)
                        .build();
                
                adminRepository.save(superAdmin);
                log.info("Default SuperAdmin account created successfully");
                log.info("Email: superadmin@wildkits.com");
                log.info("Password: SuperAdmin123? (stored securely with BCrypt)");
            } else {
                log.info("SuperAdmin account already exists");
            }
        };
    }
}
