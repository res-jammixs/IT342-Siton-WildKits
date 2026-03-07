package com.wildkits.service;

import java.util.List;

import com.wildkits.dto.AccountApprovalRequestDTO;
import com.wildkits.dto.AccountApprovalResponseDTO;

public interface AccountApprovalService {
    
    AccountApprovalResponseDTO approveUser(AccountApprovalRequestDTO requestDTO);
    
    AccountApprovalResponseDTO getApprovalById(Long approvalId);
    
    List<AccountApprovalResponseDTO> getAllApprovals();
    
    List<AccountApprovalResponseDTO> getPendingApprovals();
}
