package com.wildkits.service;

import java.util.List;

import com.wildkits.dto.AdminLoginRequestDTO;
import com.wildkits.dto.AdminRequestDTO;
import com.wildkits.dto.AdminResponseDTO;

public interface AdminService {
    
    AdminResponseDTO createAdmin(AdminRequestDTO requestDTO);
    
    AdminResponseDTO login(AdminLoginRequestDTO requestDTO);
    
    AdminResponseDTO getAdminById(Long adminId);
    
    List<AdminResponseDTO> getAllAdmins();
}
