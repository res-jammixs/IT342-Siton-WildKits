package edu.cit.siton.wildkits.service;

import java.util.List;

import edu.cit.siton.wildkits.dto.AccountApprovalRequestDTO;
import edu.cit.siton.wildkits.dto.AccountApprovalResponseDTO;

public interface AccountApprovalService {
    
    AccountApprovalResponseDTO approveUser(AccountApprovalRequestDTO requestDTO);
    
    AccountApprovalResponseDTO getApprovalById(Long approvalId);
    
    List<AccountApprovalResponseDTO> getAllApprovals();
    
    List<AccountApprovalResponseDTO> getPendingApprovals();
}
