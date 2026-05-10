package edu.cit.siton.wildkits.features.productreport;

import edu.cit.siton.wildkits.features.productreport.dto.ProductReportRequestDTO;
import edu.cit.siton.wildkits.features.productreport.dto.ProductReportResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ProductReportController {

    private final ProductReportService reportService;

    @PostMapping
    public ResponseEntity<ProductReportResponseDTO> createReport(@Valid @RequestBody ProductReportRequestDTO requestDTO) {
        log.info("Received request to create report for product ID: {}", requestDTO.getProductId());
        ProductReportResponseDTO response = reportService.createReport(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductReportResponseDTO>> getAllReports() {
        log.info("Received request to get all reports");
        List<ProductReportResponseDTO> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductReportResponseDTO> getReportById(@PathVariable("id") Long reportId) {
        log.info("Received request to get report with ID: {}", reportId);
        ProductReportResponseDTO report = reportService.getReportById(reportId);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ProductReportResponseDTO>> getPendingReports() {
        log.info("Received request to get pending reports");
        List<ProductReportResponseDTO> reports = reportService.getPendingReports();
        return ResponseEntity.ok(reports);
    }

    @PutMapping("/{id}/review")
    public ResponseEntity<ProductReportResponseDTO> reviewReport(
            @PathVariable("id") Long reportId,
            @RequestParam("adminId") Long adminId) {
        log.info("Received request to review report ID: {} by admin ID: {}", reportId, adminId);
        ProductReportResponseDTO response = reportService.reviewReport(reportId, adminId);
        return ResponseEntity.ok(response);
    }
}