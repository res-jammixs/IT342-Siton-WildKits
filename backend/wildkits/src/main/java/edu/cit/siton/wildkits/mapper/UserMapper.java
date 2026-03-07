package edu.cit.siton.wildkits.mapper;

import org.springframework.stereotype.Component;

import edu.cit.siton.wildkits.dto.UserRegistrationRequestDTO;
import edu.cit.siton.wildkits.dto.UserResponseDTO;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.AccountStatus;

@Component
public class UserMapper {

    public User toEntity(UserRegistrationRequestDTO dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .studentId(dto.getStudentId())
                .department(dto.getDepartment())
                .yearLevel(dto.getYearLevel())
                .accountStatus(AccountStatus.UNVERIFIED)
                .build();
    }

    public UserResponseDTO toResponseDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .studentId(user.getStudentId())
                .department(user.getDepartment())
                .yearLevel(user.getYearLevel())
                .accountStatus(user.getAccountStatus())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
