package edu.cit.siton.wildkits.features.productreport;

import edu.cit.siton.wildkits.features.productreport.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.features.productreport.dto.ProductReportResponseDTO;

import java.util.List;

public interface ProductReportService {

    ProductReportResponseDTO createReport(ProductReportRequestDTO requestDTO);

    ProductReportResponseDTO getReportById(Long reportId);

    List<ProductReportResponseDTO> getAllReports();

    List<ProductReportResponseDTO> getPendingReports();

    ProductReportResponseDTO reviewReport(Long reportId, Long adminId);
}