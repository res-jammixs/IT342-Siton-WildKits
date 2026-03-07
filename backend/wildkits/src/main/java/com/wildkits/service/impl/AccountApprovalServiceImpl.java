package com.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wildkits.dto.AccountApprovalRequestDTO;
import com.wildkits.dto.AccountApprovalResponseDTO;
import com.wildkits.entity.AccountApproval;
import com.wildkits.entity.Admin;
import com.wildkits.entity.User;
import com.wildkits.enums.ApprovalStatus;
import com.wildkits.exception.ResourceNotFoundException;
import com.wildkits.mapper.AccountApprovalMapper;
import com.wildkits.repository.AccountApprovalRepository;
import com.wildkits.repository.AdminRepository;
import com.wildkits.repository.UserRepository;
import com.wildkits.service.AccountApprovalService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AccountApprovalServiceImpl implements AccountApprovalService {

    private final AccountApprovalRepository approvalRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final AccountApprovalMapper approvalMapper;

    @Override
    public AccountApprovalResponseDTO approveUser(AccountApprovalRequestDTO requestDTO) {
        log.info("Processing approval for user ID: {} by admin ID: {}", 
                requestDTO.getUserId(), requestDTO.getAdminId());
        
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getUserId()));
        
        Admin admin = adminRepository.findById(requestDTO.getAdminId())
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + requestDTO.getAdminId()));
        
        AccountApproval approval = approvalMapper.toEntity(requestDTO, user, admin);
        AccountApproval savedApproval = approvalRepository.save(approval);
        
        // Update user account status
        user.setAccountStatus(
            requestDTO.getStatus() == ApprovalStatus.APPROVED 
                ? com.wildkits.enums.AccountStatus.VERIFIED 
                : com.wildkits.enums.AccountStatus.REJECTED
        );
        userRepository.save(user);
        
        log.info("Approval processed successfully with ID: {}", savedApproval.getApprovalId());
        return approvalMapper.toResponseDTO(savedApproval);
    }

    @Override
    @Transactional(readOnly = true)
    public AccountApprovalResponseDTO getApprovalById(Long approvalId) {
        log.info("Fetching approval with ID: {}", approvalId);
        
        AccountApproval approval = approvalRepository.findById(approvalId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval not found with ID: " + approvalId));
        
        return approvalMapper.toResponseDTO(approval);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountApprovalResponseDTO> getAllApprovals() {
        log.info("Fetching all approvals");
        
        return approvalRepository.findAll().stream()
                .map(approvalMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountApprovalResponseDTO> getPendingApprovals() {
        log.info("Fetching all pending approvals");
        
        return approvalRepository.findByStatus(ApprovalStatus.PENDING).stream()
                .map(approvalMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
