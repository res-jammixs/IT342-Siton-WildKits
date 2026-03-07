package com.wildkits.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wildkits.entity.ProductReport;
import com.wildkits.enums.ReportStatus;

@Repository
public interface ProductReportRepository extends JpaRepository<ProductReport, Long> {
    
    @Query("SELECT pr FROM ProductReport pr WHERE pr.reporter.userId = :reporterId")
    List<ProductReport> findByReporterId(@Param("reporterId") Long reporterId);
    
    @Query("SELECT pr FROM ProductReport pr WHERE pr.product.productId = :productId")
    List<ProductReport> findByProductId(@Param("productId") Long productId);
    
    List<ProductReport> findByStatus(ReportStatus status);
    
    @Query("SELECT pr FROM ProductReport pr WHERE pr.reviewedBy.adminId = :reviewedById")
    List<ProductReport> findByReviewedById(@Param("reviewedById") Long reviewedById);
}
