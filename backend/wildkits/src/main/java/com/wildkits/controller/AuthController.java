package com.wildkits.controller;

import com.wildkits.dto.AuthenticationResponse;
import com.wildkits.dto.LoginRequestDTO;
import com.wildkits.dto.UserResponseDTO;
import com.wildkits.security.JwtTokenProvider;
import com.wildkits.service.FileStorageService;
import com.wildkits.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final FileStorageService fileStorageService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(
            @RequestParam("email") @Email String email,
            @RequestParam("password") @NotBlank String password,
            @RequestParam("fullName") @NotBlank String fullName,
            @RequestParam("studentId") @NotBlank String studentId,
            @RequestParam("department") @NotBlank String department,
            @RequestParam("yearLevel") @NotBlank String yearLevel,
            @RequestParam("studentIdImage") MultipartFile studentIdImage) {
        
        try {
            log.info("Registering new user with email: {}", email);
            
            // Validate file is provided
            if (studentIdImage == null || studentIdImage.isEmpty()) {
                log.error("Student ID image is required");
                return ResponseEntity.badRequest().body(
                    java.util.Map.of("error", "Student ID image is required")
                );
            }
            
            // Register user with uploaded student ID image
            UserResponseDTO user = userService.registerWithImage(
                    email, password, fullName, studentId, department, yearLevel, studentIdImage);
            
            // Try to generate JWT token, but don't fail registration if it fails
            String token = "";
            try {
                token = jwtTokenProvider.generateToken(
                        user.getUserId(),
                        user.getEmail(),
                        "USER"
                );
            } catch (Exception jwtError) {
                log.warn("JWT generation failed, but user was created successfully: {}", jwtError.getMessage());
                // Continue without token - user can login later
            }
            
            // Build response
            AuthenticationResponse response = AuthenticationResponse.builder()
                    .user(AuthenticationResponse.UserInfo.builder()
                            .id(user.getUserId().toString())
                            .email(user.getEmail())
                            .role("USER")
                            .status(user.getAccountStatus().toString())
                            .build())
                    .token(token)
                    .build();
            
            log.info("User registered successfully with ID: {}", user.getUserId());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
            
        } catch (IllegalArgumentException e) {
            log.error("Validation error during registration: {}", e.getMessage());
            return ResponseEntity.badRequest().body(
                java.util.Map.of("error", e.getMessage())
            );
        } catch (com.wildkits.exception.DuplicateResourceException e) {
            log.error("Duplicate resource: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                java.util.Map.of("error", e.getMessage())
            );
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                java.util.Map.of(
                    "error", "Registration failed: " + e.getMessage(),
                    "details", e.getClass().getSimpleName()
                )
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequestDTO requestDTO) {
        log.info("Login attempt for email: {}", requestDTO.getEmail());
        
        UserResponseDTO user = userService.login(requestDTO);
        
        // Generate JWT token
        String token = jwtTokenProvider.generateToken(
                user.getUserId(),
                user.getEmail(),
                "USER"
        );
        
        // Build response
        AuthenticationResponse response = AuthenticationResponse.builder()
                .user(AuthenticationResponse.UserInfo.builder()
                        .id(user.getUserId().toString())
                        .email(user.getEmail())
                        .role("USER")
                        .status(user.getAccountStatus().toString())
                        .build())
                .token(token)
                .build();
        
        log.info("User logged in successfully: {}", user.getEmail());
        return ResponseEntity.ok(response);
    }
}
