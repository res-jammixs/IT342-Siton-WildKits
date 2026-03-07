package com.wildkits.dto;

import java.time.LocalDateTime;

import com.wildkits.enums.ApprovalStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountApprovalResponseDTO {

    private Long approvalId;
    private LocalDateTime approvalDate;
    private ApprovalStatus status;
    private Long userId;
    private String userName;
    private Long adminId;
    private String adminName;
}
