package edu.cit.siton.wildkits.controller;

import edu.cit.siton.wildkits.dto.AccountApprovalRequestDTO;
import edu.cit.siton.wildkits.dto.AccountApprovalResponseDTO;
import edu.cit.siton.wildkits.service.AccountApprovalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AccountApprovalController {

    private final AccountApprovalService approvalService;

    @PostMapping("/approve-user")
    public ResponseEntity<AccountApprovalResponseDTO> approveUser(@Valid @RequestBody AccountApprovalRequestDTO requestDTO) {
        log.info("Received request to approve user ID: {}", requestDTO.getUserId());
        AccountApprovalResponseDTO response = approvalService.approveUser(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/approvals")
    public ResponseEntity<List<AccountApprovalResponseDTO>> getAllApprovals() {
        log.info("Received request to get all approvals");
        List<AccountApprovalResponseDTO> approvals = approvalService.getAllApprovals();
        return ResponseEntity.ok(approvals);
    }

    @GetMapping("/pending-approvals")
    public ResponseEntity<List<AccountApprovalResponseDTO>> getPendingApprovals() {
        log.info("Received request to get pending approvals");
        List<AccountApprovalResponseDTO> approvals = approvalService.getPendingApprovals();
        return ResponseEntity.ok(approvals);
    }

    @GetMapping("/approvals/{id}")
    public ResponseEntity<AccountApprovalResponseDTO> getApprovalById(@PathVariable("id") Long approvalId) {
        log.info("Received request to get approval with ID: {}", approvalId);
        AccountApprovalResponseDTO approval = approvalService.getApprovalById(approvalId);
        return ResponseEntity.ok(approval);
    }
}
