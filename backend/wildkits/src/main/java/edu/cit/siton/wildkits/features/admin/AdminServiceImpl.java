package edu.cit.siton.wildkits.features.admin;

import edu.cit.siton.wildkits.common.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.features.admin.dto.AdminRequestDTO;
import edu.cit.siton.wildkits.features.admin.dto.AdminResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

        if (adminRepository.findByEmail(requestDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Admin with email " + requestDTO.getEmail() + " already exists");
        }

        Admin admin = adminMapper.toEntity(requestDTO);
        admin.setPassword(passwordEncoder.encode(requestDTO.getPassword()));

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