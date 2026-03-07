package com.wildkits.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.wildkits.enums.ReportStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductReportResponseDTO {

    private Long reportId;
    private String reason;
    private LocalDateTime reportDate;
    private ReportStatus status;
    private UUID reporterUserId;
    private String reporterName;
    private Long productId;
    private String productTitle;
    private Long reviewedByAdminId;
    private String reviewedByAdminName;
}
