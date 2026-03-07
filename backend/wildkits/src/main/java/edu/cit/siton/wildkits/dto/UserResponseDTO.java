package edu.cit.siton.wildkits.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import edu.cit.siton.wildkits.enums.AccountStatus;
import edu.cit.siton.wildkits.enums.Department;
import edu.cit.siton.wildkits.enums.YearLevel;

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
