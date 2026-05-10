package edu.cit.siton.wildkits.features.productreport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductReportRepository extends JpaRepository<ProductReport, Long> {
    List<ProductReport> findByStatus(ReportStatus status);
}