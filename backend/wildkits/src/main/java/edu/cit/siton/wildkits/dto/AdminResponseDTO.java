package edu.cit.siton.wildkits.dto;

import edu.cit.siton.wildkits.enums.AdminRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminResponseDTO {

    private Long adminId;
    private String name;
    private String email;
    private AdminRole role;
}
