package edu.cit.siton.wildkits.features.user.dto;

import edu.cit.siton.wildkits.features.user.Department;
import edu.cit.siton.wildkits.features.user.YearLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegistrationRequestDTO {
    private String name;
    private String email;
    private String password;
    private String studentId;
    private Department department;
    private YearLevel yearLevel;
}