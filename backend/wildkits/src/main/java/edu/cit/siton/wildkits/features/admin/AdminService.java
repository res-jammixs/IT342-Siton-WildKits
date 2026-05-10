package edu.cit.siton.wildkits.features.admin;

import edu.cit.siton.wildkits.features.admin.dto.AdminRequestDTO;
import edu.cit.siton.wildkits.features.admin.dto.AdminResponseDTO;

import java.util.List;

public interface AdminService {

    AdminResponseDTO createAdmin(AdminRequestDTO requestDTO);

    AdminResponseDTO login(AdminLoginRequestDTO requestDTO);

    AdminResponseDTO getAdminById(Long adminId);

    List<AdminResponseDTO> getAllAdmins();
}