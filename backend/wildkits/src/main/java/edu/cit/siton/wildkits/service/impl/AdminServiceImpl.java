package edu.cit.siton.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.cit.siton.wildkits.dto.AdminLoginRequestDTO;
import edu.cit.siton.wildkits.dto.AdminRequestDTO;
import edu.cit.siton.wildkits.dto.AdminResponseDTO;
import edu.cit.siton.wildkits.entity.Admin;
import edu.cit.siton.wildkits.exception.DuplicateResourceException;
import edu.cit.siton.wildkits.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.mapper.AdminMapper;
import edu.cit.siton.wildkits.repository.AdminRepository;
import edu.cit.siton.wildkits.service.AdminService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AdminResponseDTO createAdmin(AdminRequestDTO requestDTO) {
        log.info("Creating new admin with email: {}", requestDTO.getEmail());
        
        // Check for duplicate email
        if (adminRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateResourceException("Admin with email " + requestDTO.getEmail() + " already exists");
        }
        
        // Convert DTO to entity
        Admin admin = adminMapper.toEntity(requestDTO);
        
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(requestDTO.getPassword());
        admin.setPassword(hashedPassword);
        
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
        
        // Verify password using BCrypt
        if (!passwordEncoder.matches(requestDTO.getPassword(), admin.getPassword())) {
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
