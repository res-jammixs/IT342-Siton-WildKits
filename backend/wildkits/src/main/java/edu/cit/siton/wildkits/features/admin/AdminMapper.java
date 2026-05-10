package edu.cit.siton.wildkits.features.admin;

import edu.cit.siton.wildkits.features.admin.dto.AdminRequestDTO;
import edu.cit.siton.wildkits.features.admin.dto.AdminResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class AdminMapper {

    public Admin toEntity(AdminRequestDTO dto) {
        return Admin.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .role(dto.getRole())
                .build();
    }

    public AdminResponseDTO toResponseDTO(Admin admin) {
        return AdminResponseDTO.builder()
                .adminId(admin.getAdminId())
                .name(admin.getName())
                .email(admin.getEmail())
                .role(admin.getRole().toString())
                .build();
    }
}