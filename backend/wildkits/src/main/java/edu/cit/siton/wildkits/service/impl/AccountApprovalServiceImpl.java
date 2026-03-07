package edu.cit.siton.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.cit.siton.wildkits.dto.AccountApprovalRequestDTO;
import edu.cit.siton.wildkits.dto.AccountApprovalResponseDTO;
import edu.cit.siton.wildkits.entity.AccountApproval;
import edu.cit.siton.wildkits.entity.Admin;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.ApprovalStatus;
import edu.cit.siton.wildkits.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.mapper.AccountApprovalMapper;
import edu.cit.siton.wildkits.repository.AccountApprovalRepository;
import edu.cit.siton.wildkits.repository.AdminRepository;
import edu.cit.siton.wildkits.repository.UserRepository;
import edu.cit.siton.wildkits.service.AccountApprovalService;

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
                ? edu.cit.siton.wildkits.enums.AccountStatus.VERIFIED 
                : edu.cit.siton.wildkits.enums.AccountStatus.REJECTED
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
