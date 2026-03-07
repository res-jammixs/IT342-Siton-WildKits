package edu.cit.siton.wildkits.service;

import java.util.List;

import edu.cit.siton.wildkits.dto.AdminLoginRequestDTO;
import edu.cit.siton.wildkits.dto.AdminRequestDTO;
import edu.cit.siton.wildkits.dto.AdminResponseDTO;

public interface AdminService {
    
    AdminResponseDTO createAdmin(AdminRequestDTO requestDTO);
    
    AdminResponseDTO login(AdminLoginRequestDTO requestDTO);
    
    AdminResponseDTO getAdminById(Long adminId);
    
    List<AdminResponseDTO> getAllAdmins();
}
