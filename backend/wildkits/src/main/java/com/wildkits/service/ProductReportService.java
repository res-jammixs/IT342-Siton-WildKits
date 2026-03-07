package com.wildkits.service;

import java.util.List;

import com.wildkits.dto.ProductReportRequestDTO;
import com.wildkits.dto.ProductReportResponseDTO;

public interface ProductReportService {
    
    ProductReportResponseDTO createReport(ProductReportRequestDTO requestDTO);
    
    ProductReportResponseDTO getReportById(Long reportId);
    
    List<ProductReportResponseDTO> getAllReports();
    
    List<ProductReportResponseDTO> getPendingReports();
    
    ProductReportResponseDTO reviewReport(Long reportId, Long adminId);
}
