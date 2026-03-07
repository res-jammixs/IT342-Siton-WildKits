package edu.cit.siton.wildkits.dto;

import java.util.UUID;

import edu.cit.siton.wildkits.enums.ApprovalStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountApprovalRequestDTO {

    @NotNull(message = "User ID is required")
    private UUID userId;

    @NotNull(message = "Admin ID is required")
    private Long adminId;

    @NotNull(message = "Approval status is required")
    private ApprovalStatus status;
}
