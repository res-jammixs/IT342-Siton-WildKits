package edu.cit.siton.wildkits.features.productreport;

import edu.cit.siton.wildkits.common.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.features.admin.Admin;
import edu.cit.siton.wildkits.features.admin.AdminRepository;
import edu.cit.siton.wildkits.features.product.Product;
import edu.cit.siton.wildkits.features.product.ProductRepository;
import edu.cit.siton.wildkits.features.productreport.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.features.productreport.dto.ProductReportResponseDTO;
import edu.cit.siton.wildkits.features.user.User;
import edu.cit.siton.wildkits.features.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductReportServiceImpl implements ProductReportService {

    private final ProductReportRepository reportRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final ProductReportMapper reportMapper;

    @Override
    public ProductReportResponseDTO createReport(ProductReportRequestDTO requestDTO) {
        log.info("Creating new report for product ID: {}", requestDTO.getProductId());

        Product product = productRepository.findById(requestDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + requestDTO.getProductId()));

        User reporter = userRepository.findById(requestDTO.getReporterId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getReporterId()));

        ProductReport report = reportMapper.toEntity(requestDTO, product, reporter);
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
        log.info("Fetching pending reports");

        return reportRepository.findByStatus(ReportStatus.PENDING).stream()
                .map(reportMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductReportResponseDTO reviewReport(Long reportId, Long adminId) {
        log.info("Reviewing report ID: {} by admin ID: {}", reportId, adminId);

        ProductReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + adminId));

        report.setReviewedBy(admin);
        report.setStatus(ReportStatus.REVIEWED);

        ProductReport updatedReport = reportRepository.save(report);

        log.info("Report reviewed successfully with ID: {}", reportId);
        return reportMapper.toResponseDTO(updatedReport);
    }
}