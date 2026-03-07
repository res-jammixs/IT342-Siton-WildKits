package edu.cit.siton.wildkits.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.cit.siton.wildkits.entity.AccountApproval;
import edu.cit.siton.wildkits.enums.ApprovalStatus;

@Repository
public interface AccountApprovalRepository extends JpaRepository<AccountApproval, Long> {
    
    @Query("SELECT a FROM AccountApproval a WHERE a.user.userId = :userId")
    Optional<AccountApproval> findByUserId(@Param("userId") Long userId);
    
    List<AccountApproval> findByStatus(ApprovalStatus status);
    
    @Query("SELECT a FROM AccountApproval a WHERE a.admin.adminId = :adminId")
    List<AccountApproval> findByAdminId(@Param("adminId") Long adminId);
}
