package edu.cit.siton.wildkits.features.admin.dto;

import edu.cit.siton.wildkits.features.admin.AdminRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminRequestDTO {
    private String name;
    private String email;
    private String password;
    private AdminRole role;
}