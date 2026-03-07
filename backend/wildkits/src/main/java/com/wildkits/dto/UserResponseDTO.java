package com.wildkits.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.wildkits.enums.AccountStatus;
import com.wildkits.enums.Department;
import com.wildkits.enums.YearLevel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {

    private UUID userId;
    private String name;
    private String email;
    private String studentId;
    private Department department;
    private YearLevel yearLevel;
    private AccountStatus accountStatus;
    private LocalDateTime createdAt;
}
