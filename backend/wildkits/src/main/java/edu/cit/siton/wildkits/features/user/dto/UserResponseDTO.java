package edu.cit.siton.wildkits.features.user.dto;

import edu.cit.siton.wildkits.features.user.Department;
import edu.cit.siton.wildkits.features.user.YearLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private UUID userId;
    private String name;
    private String email;
    private String studentId;
    private String studentIdImageUrl;
    private Department department;
    private YearLevel yearLevel;
    private String accountStatus;
    private LocalDateTime createdAt;
}