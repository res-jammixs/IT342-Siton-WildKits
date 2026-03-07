package com.wildkits.mapper;

import org.springframework.stereotype.Component;

import com.wildkits.dto.ProductReportRequestDTO;
import com.wildkits.dto.ProductReportResponseDTO;
import com.wildkits.entity.Product;
import com.wildkits.entity.ProductReport;
import com.wildkits.entity.User;
import com.wildkits.enums.ReportStatus;

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
