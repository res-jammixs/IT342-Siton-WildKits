package edu.cit.siton.wildkits.service;

import java.util.List;

import edu.cit.siton.wildkits.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.dto.ProductReportResponseDTO;

public interface ProductReportService {
    
    ProductReportResponseDTO createReport(ProductReportRequestDTO requestDTO);
    
    ProductReportResponseDTO getReportById(Long reportId);
    
    List<ProductReportResponseDTO> getAllReports();
    
    List<ProductReportResponseDTO> getPendingReports();
    
    ProductReportResponseDTO reviewReport(Long reportId, Long adminId);
}
