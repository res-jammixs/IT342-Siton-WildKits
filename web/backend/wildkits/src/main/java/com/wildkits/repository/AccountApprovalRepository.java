package com.wildkits.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildkits.entity.AccountApproval;
import com.wildkits.enums.ApprovalStatus;

@Repository
public interface AccountApprovalRepository extends JpaRepository<AccountApproval, Long> {
    
    Optional<AccountApproval> findByUserId(Long userId);
    
    List<AccountApproval> findByStatus(ApprovalStatus status);
    
    List<AccountApproval> findByAdminId(Long adminId);
}
