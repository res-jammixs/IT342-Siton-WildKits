package edu.cit.siton.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.cit.siton.wildkits.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.dto.ProductReportResponseDTO;
import edu.cit.siton.wildkits.entity.Admin;
import edu.cit.siton.wildkits.entity.Product;
import edu.cit.siton.wildkits.entity.ProductReport;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.ReportStatus;
import edu.cit.siton.wildkits.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.mapper.ProductReportMapper;
import edu.cit.siton.wildkits.repository.AdminRepository;
import edu.cit.siton.wildkits.repository.ProductReportRepository;
import edu.cit.siton.wildkits.repository.ProductRepository;
import edu.cit.siton.wildkits.repository.UserRepository;
import edu.cit.siton.wildkits.service.ProductReportService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductReportServiceImpl implements ProductReportService {

    private final ProductReportRepository reportRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final AdminRepository adminRepository;
    private final ProductReportMapper reportMapper;

    @Override
    public ProductReportResponseDTO createReport(ProductReportRequestDTO requestDTO) {
        log.info("Creating new report for product ID: {} by user ID: {}", 
                requestDTO.getProductId(), requestDTO.getReporterUserId());
        
        User reporter = userRepository.findById(requestDTO.getReporterUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getReporterUserId()));
        
        Product product = productRepository.findById(requestDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + requestDTO.getProductId()));
        
        ProductReport report = reportMapper.toEntity(requestDTO, reporter, product);
        ProductReport savedReport = reportRepository.save(report);
        
        log.info("Report created successfully with ID: {}", savedReport.getReportId());
        return reportMapper.toResponseDTO(savedReport);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductReportResponseDTO getReportById(Long reportId) {
        log.info("Fetching report with ID: {}", reportId);
        
        ProductReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));
        
        return reportMapper.toResponseDTO(report);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductReportResponseDTO> getAllReports() {
        log.info("Fetching all reports");
        
        return reportRepository.findAll().stream()
                .map(reportMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductReportResponseDTO> getPendingReports() {
        log.info("Fetching all pending reports");
        
        return reportRepository.findByStatus(ReportStatus.PENDING).stream()
                .map(reportMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductReportResponseDTO reviewReport(Long reportId, Long adminId) {
        log.info("Admin ID: {} reviewing report ID: {}", adminId, reportId);
        
        ProductReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));
        
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + adminId));
        
        report.setStatus(ReportStatus.REVIEWED);
        report.setReviewedBy(admin);
        
        ProductReport updatedReport = reportRepository.save(report);
        
        log.info("Report reviewed successfully with ID: {}", updatedReport.getReportId());
        return reportMapper.toResponseDTO(updatedReport);
    }
}
