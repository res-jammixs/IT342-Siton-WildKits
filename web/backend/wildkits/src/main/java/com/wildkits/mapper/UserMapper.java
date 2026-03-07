package com.wildkits.mapper;

import org.springframework.stereotype.Component;

import com.wildkits.dto.UserRegistrationRequestDTO;
import com.wildkits.dto.UserResponseDTO;
import com.wildkits.entity.User;
import com.wildkits.enums.AccountStatus;

@Component
public class UserMapper {

    public User toEntity(UserRegistrationRequestDTO dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .accountStatus(AccountStatus.PENDING)
                .build();
    }

    public UserResponseDTO toResponseDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .accountStatus(user.getAccountStatus())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
