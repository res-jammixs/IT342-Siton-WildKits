package edu.cit.siton.wildkits.features.productreport;

import edu.cit.siton.wildkits.features.admin.Admin;
import edu.cit.siton.wildkits.features.product.Product;
import edu.cit.siton.wildkits.features.productreport.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.features.productreport.dto.ProductReportResponseDTO;
import edu.cit.siton.wildkits.features.user.User;
import org.springframework.stereotype.Component;

@Component
public class ProductReportMapper {

    public ProductReport toEntity(ProductReportRequestDTO dto, Product product, User reporter) {
        return ProductReport.builder()
                .reason(dto.getReason())
                .status(ReportStatus.PENDING)
                .product(product)
                .reporter(reporter)
                .build();
    }

    public ProductReportResponseDTO toResponseDTO(ProductReport report) {
        return ProductReportResponseDTO.builder()
                .reportId(report.getReportId())
                .reason(report.getReason())
                .status(report.getStatus())
                .createdAt(report.getCreatedAt())
                .productId(report.getProduct() != null ? report.getProduct().getProductId() : null)
                .reporterName(report.getReporter() != null ? report.getReporter().getName() : null)
                .reviewedById(report.getReviewedBy() != null ? report.getReviewedBy().getAdminId() : null)
                .build();
    }
}