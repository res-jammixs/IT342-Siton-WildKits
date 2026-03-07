package com.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wildkits.dto.AdminLoginRequestDTO;
import com.wildkits.dto.AdminRequestDTO;
import com.wildkits.dto.AdminResponseDTO;
import com.wildkits.entity.Admin;
import com.wildkits.exception.DuplicateResourceException;
import com.wildkits.exception.ResourceNotFoundException;
import com.wildkits.mapper.AdminMapper;
import com.wildkits.repository.AdminRepository;
import com.wildkits.service.AdminService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;

    @Override
    public AdminResponseDTO createAdmin(AdminRequestDTO requestDTO) {
        log.info("Creating new admin with email: {}", requestDTO.getEmail());
        
        if (adminRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateResourceException("Admin with email " + requestDTO.getEmail() + " already exists");
        }
        
        Admin admin = adminMapper.toEntity(requestDTO);
        Admin savedAdmin = adminRepository.save(admin);
        
        log.info("Admin created successfully with ID: {}", savedAdmin.getAdminId());
        return adminMapper.toResponseDTO(savedAdmin);
    }

    @Override
    @Transactional(readOnly = true)
    public AdminResponseDTO login(AdminLoginRequestDTO requestDTO) {
        log.info("Attempting admin login for email: {}", requestDTO.getEmail());
        
        Admin admin = adminRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));
        
        // Simple password check
        if (!admin.getPassword().equals(requestDTO.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }
        
        log.info("Admin logged in successfully with ID: {}", admin.getAdminId());
        return adminMapper.toResponseDTO(admin);
    }

    @Override
    @Transactional(readOnly = true)
    public AdminResponseDTO getAdminById(Long adminId) {
        log.info("Fetching admin with ID: {}", adminId);
        
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + adminId));
        
        return adminMapper.toResponseDTO(admin);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdminResponseDTO> getAllAdmins() {
        log.info("Fetching all admins");
        
        return adminRepository.findAll().stream()
                .map(adminMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
