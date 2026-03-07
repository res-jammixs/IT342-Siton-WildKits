package com.wildkits.mapper;

import org.springframework.stereotype.Component;

import com.wildkits.dto.AccountApprovalRequestDTO;
import com.wildkits.dto.AccountApprovalResponseDTO;
import com.wildkits.entity.AccountApproval;
import com.wildkits.entity.Admin;
import com.wildkits.entity.User;

@Component
public class AccountApprovalMapper {

    public AccountApproval toEntity(AccountApprovalRequestDTO dto, User user, Admin admin) {
        return AccountApproval.builder()
                .status(dto.getStatus())
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
                .userName(approval.getUser() != null ? approval.getUser().getName() : null)
                .adminId(approval.getAdmin() != null ? approval.getAdmin().getAdminId() : null)
                .adminName(approval.getAdmin() != null ? approval.getAdmin().getName() : null)
                .build();
    }
}
