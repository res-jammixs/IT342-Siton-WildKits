package edu.cit.siton.wildkits.features.accountapproval;

import edu.cit.siton.wildkits.features.accountapproval.dto.AccountApprovalRequestDTO;
import edu.cit.siton.wildkits.features.accountapproval.dto.AccountApprovalResponseDTO;

import java.util.List;

public interface AccountApprovalService {

    AccountApprovalResponseDTO approveUser(AccountApprovalRequestDTO requestDTO);

    List<AccountApprovalResponseDTO> getAllApprovals();

    List<AccountApprovalResponseDTO> getPendingApprovals();

    AccountApprovalResponseDTO getApprovalById(Long approvalId);
}