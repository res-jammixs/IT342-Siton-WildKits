package com.wildkits.dto;

import com.wildkits.enums.ApprovalStatus;

import javax.validation.constraints.NotNull;
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
    private Long userId;

    @NotNull(message = "Admin ID is required")
    private Long adminId;

    @NotNull(message = "Approval status is required")
    private ApprovalStatus status;
}
