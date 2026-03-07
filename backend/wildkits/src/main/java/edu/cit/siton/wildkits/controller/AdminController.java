package edu.cit.siton.wildkits.controller;

import edu.cit.siton.wildkits.dto.AdminLoginRequestDTO;
import edu.cit.siton.wildkits.dto.AdminRequestDTO;
import edu.cit.siton.wildkits.dto.AdminResponseDTO;
import edu.cit.siton.wildkits.dto.UserResponseDTO;
import edu.cit.siton.wildkits.dto.VerifyUserRequest;
import edu.cit.siton.wildkits.enums.AccountStatus;
import edu.cit.siton.wildkits.service.AdminService;
import edu.cit.siton.wildkits.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<AdminResponseDTO> createAdmin(@Valid @RequestBody AdminRequestDTO requestDTO) {
        log.info("Received request to create admin with email: {}", requestDTO.getEmail());
        AdminResponseDTO response = adminService.createAdmin(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AdminResponseDTO> login(@Valid @RequestBody AdminLoginRequestDTO requestDTO) {
        log.info("Received admin login request for email: {}", requestDTO.getEmail());
        AdminResponseDTO response = adminService.login(requestDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AdminResponseDTO>> getAllAdmins() {
        log.info("Received request to get all admins");
        List<AdminResponseDTO> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> getAdminById(@PathVariable("id") Long adminId) {
        log.info("Received request to get admin with ID: {}", adminId);
        AdminResponseDTO admin = adminService.getAdminById(adminId);
        return ResponseEntity.ok(admin);
    }

    @PatchMapping("/verify/{userId}")
    public ResponseEntity<UserResponseDTO> verifyUser(
            @PathVariable("userId") UUID userId,
            @Valid @RequestBody VerifyUserRequest request) {
        log.info("Received request to verify user with ID: {} - Status: {}", userId, request.getStatus());
        AccountStatus status = AccountStatus.valueOf(request.getStatus());
        UserResponseDTO response = userService.updateUserStatus(userId, status);
        return ResponseEntity.ok(response);
    }
}
