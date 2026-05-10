package edu.cit.siton.wildkits.features.productreport.dto;

import edu.cit.siton.wildkits.features.productreport.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductReportResponseDTO {
    private Long reportId;
    private String reason;
    private ReportStatus status;
    private LocalDateTime createdAt;
    private Long productId;
    private String reporterName;
    private Long reviewedById;
}