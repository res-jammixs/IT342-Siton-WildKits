package edu.cit.siton.wildkits.features.user;

import edu.cit.siton.wildkits.features.user.dto.UserRegistrationRequestDTO;
import edu.cit.siton.wildkits.features.user.dto.UserResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRegistrationRequestDTO dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .studentId(dto.getStudentId())
                .department(dto.getDepartment())
                .yearLevel(dto.getYearLevel())
                .build();
    }

    public UserResponseDTO toResponseDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .studentId(user.getStudentId())
                .studentIdImageUrl(user.getStudentIdImageUrl())
                .department(user.getDepartment())
                .yearLevel(user.getYearLevel())
                .accountStatus(user.getAccountStatus().toString())
                .createdAt(user.getCreatedAt())
                .build();
    }
}