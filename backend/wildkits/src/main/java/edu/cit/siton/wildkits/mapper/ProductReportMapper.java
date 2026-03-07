package edu.cit.siton.wildkits.mapper;

import org.springframework.stereotype.Component;

import edu.cit.siton.wildkits.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.dto.ProductReportResponseDTO;
import edu.cit.siton.wildkits.entity.Product;
import edu.cit.siton.wildkits.entity.ProductReport;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.ReportStatus;

@Component
public class ProductReportMapper {

    public ProductReport toEntity(ProductReportRequestDTO dto, User reporter, Product product) {
        return ProductReport.builder()
                .reason(dto.getReason())
                .status(ReportStatus.PENDING)
                .reporter(reporter)
                .product(product)
                .build();
    }

    public ProductReportResponseDTO toResponseDTO(ProductReport report) {
        return ProductReportResponseDTO.builder()
                .reportId(report.getReportId())
                .reason(report.getReason())
                .reportDate(report.getReportDate())
                .status(report.getStatus())
                .reporterUserId(report.getReporter() != null ? report.getReporter().getUserId() : null)
                .reporterName(report.getReporter() != null ? report.getReporter().getName() : null)
                .productId(report.getProduct() != null ? report.getProduct().getProductId() : null)
                .productTitle(report.getProduct() != null ? report.getProduct().getTitle() : null)
                .reviewedByAdminId(report.getReviewedBy() != null ? report.getReviewedBy().getAdminId() : null)
                .reviewedByAdminName(report.getReviewedBy() != null ? report.getReviewedBy().getName() : null)
                .build();
    }
}
