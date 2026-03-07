package com.wildkits.dto;

import java.time.LocalDateTime;

import com.wildkits.enums.AccountStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {

    private Long userId;
    private String name;
    private String email;
    private AccountStatus accountStatus;
    private LocalDateTime createdAt;
}
