package com.wildkits.controller;

import com.wildkits.dto.AdminLoginRequestDTO;
import com.wildkits.dto.AdminRequestDTO;
import com.wildkits.dto.AdminResponseDTO;
import com.wildkits.service.AdminService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

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
}
