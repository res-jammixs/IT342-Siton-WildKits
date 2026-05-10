package edu.cit.siton.wildkits.features.accountapproval;

import edu.cit.siton.wildkits.features.accountapproval.dto.AccountApprovalRequestDTO;
import edu.cit.siton.wildkits.features.accountapproval.dto.AccountApprovalResponseDTO;
import edu.cit.siton.wildkits.features.admin.Admin;
import edu.cit.siton.wildkits.features.user.User;
import org.springframework.stereotype.Component;

@Component
public class AccountApprovalMapper {

    public AccountApproval toEntity(AccountApprovalRequestDTO dto, User user, Admin admin) {
        return AccountApproval.builder()
                .status(ApprovalStatus.PENDING)
                .user(user)
                .admin(admin)
                .build();
    }

    public AccountApprovalResponseDTO toResponseDTO(AccountApproval approval) {
        return AccountApprovalResponseDTO.builder()
                .approvalId(approval.getApprovalId())
                .approvalDate(approval.getApprovalDate())
                .status(approval.getStatus())
                .userId(approval.getUser() != null ? approval.getUser().getUserId() : null)
                .adminId(approval.getAdmin() != null ? approval.getAdmin().getAdminId() : null)
                .build();
    }
}