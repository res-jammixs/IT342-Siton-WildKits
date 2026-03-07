package com.wildkits.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wildkits.entity.Transaction;
import com.wildkits.enums.TransactionStatus;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    @Query("SELECT t FROM Transaction t WHERE t.user.userId = :userId")
    List<Transaction> findByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT t FROM Transaction t WHERE t.product.productId = :productId")
    List<Transaction> findByProductId(@Param("productId") Long productId);
    
    List<Transaction> findByStatus(TransactionStatus status);
    
    @Query("SELECT t FROM Transaction t WHERE t.user.userId = :userId AND t.status = :status")
    List<Transaction> findByUserIdAndStatus(@Param("userId") UUID userId, @Param("status") TransactionStatus status);
}
