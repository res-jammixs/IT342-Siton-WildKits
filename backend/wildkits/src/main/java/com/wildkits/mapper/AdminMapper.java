package com.wildkits.mapper;

import org.springframework.stereotype.Component;

import com.wildkits.dto.AdminRequestDTO;
import com.wildkits.dto.AdminResponseDTO;
import com.wildkits.entity.Admin;

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
                .role(admin.getRole())
                .build();
    }
}
