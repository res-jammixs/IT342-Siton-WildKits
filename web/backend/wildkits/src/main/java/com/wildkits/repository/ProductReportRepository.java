package com.wildkits.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildkits.entity.ProductReport;
import com.wildkits.enums.ReportStatus;

@Repository
public interface ProductReportRepository extends JpaRepository<ProductReport, Long> {
    
    List<ProductReport> findByReporterId(Long reporterId);
    
    List<ProductReport> findByProductId(Long productId);
    
    List<ProductReport> findByStatus(ReportStatus status);
    
    List<ProductReport> findByReviewedById(Long reviewedById);
}
