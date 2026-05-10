package edu.cit.siton.wildkits.features.accountapproval.dto;

import edu.cit.siton.wildkits.features.accountapproval.ApprovalStatus;
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
public class AccountApprovalResponseDTO {
    private Long approvalId;
    private LocalDateTime approvalDate;
    private ApprovalStatus status;
    private UUID userId;
    private Long adminId;
}