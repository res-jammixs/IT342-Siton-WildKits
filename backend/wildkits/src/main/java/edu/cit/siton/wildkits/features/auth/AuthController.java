package edu.cit.siton.wildkits.features.auth;

import edu.cit.siton.wildkits.features.product.FileStorageService;
import edu.cit.siton.wildkits.features.user.LoginRequestDTO;
import edu.cit.siton.wildkits.features.user.dto.UserResponseDTO;
import edu.cit.siton.wildkits.features.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

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

            if (studentIdImage == null || studentIdImage.isEmpty()) {
                log.error("Student ID image is required");
                return ResponseEntity.badRequest().body(
                        java.util.Map.of("error", "Student ID image is required")
                );
            }

            UserResponseDTO user = userService.registerWithImage(
                    email, password, fullName, studentId, department, yearLevel, studentIdImage);

            String token = "";
            try {
                token = jwtTokenProvider.generateToken(
                        user.getUserId(),
                        user.getEmail(),
                        "USER"
                );
            } catch (Exception jwtError) {
                log.warn("JWT generation failed, but user was created successfully: {}", jwtError.getMessage());
            }

            AuthenticationResponse response = AuthenticationResponse.builder()
                    .user(AuthenticationResponse.UserInfo.builder()
                            .id(user.getUserId().toString())
                            .email(user.getEmail())
                            .role("USER")
                            .status(user.getAccountStatus())
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
        } catch (edu.cit.siton.wildkits.common.exception.DuplicateResourceException e) {
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

        String token = jwtTokenProvider.generateToken(
                user.getUserId(),
                user.getEmail(),
                "USER"
        );

        AuthenticationResponse response = AuthenticationResponse.builder()
                .user(AuthenticationResponse.UserInfo.builder()
                        .id(user.getUserId().toString())
                        .email(user.getEmail())
                        .role("USER")
                        .status(user.getAccountStatus())
                        .build())
                .token(token)
                .build();

        log.info("User logged in successfully: {}", user.getEmail());
        return ResponseEntity.ok(response);
    }
}