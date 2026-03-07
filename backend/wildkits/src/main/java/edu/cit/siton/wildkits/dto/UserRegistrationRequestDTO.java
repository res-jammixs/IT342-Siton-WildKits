package edu.cit.siton.wildkits.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

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
public class UserRegistrationRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;

    @NotBlank(message = "Student ID is required")
    @Pattern(regexp = "^\\d{2}-\\d{4}-\\d{3}$", message = "Student ID must follow format XX-XXXX-XXX")
    private String studentId;

    @NotNull(message = "Department is required")
    private Department department;

    @NotNull(message = "Year level is required")
    private YearLevel yearLevel;
}
