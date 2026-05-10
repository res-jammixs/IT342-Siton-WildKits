package edu.cit.siton.wildkits.features.accountapproval;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountApprovalRepository extends JpaRepository<AccountApproval, Long> {
    List<AccountApproval> findByStatus(ApprovalStatus status);
}