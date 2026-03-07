package com.wildkits.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildkits.entity.Transaction;
import com.wildkits.enums.TransactionStatus;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    List<Transaction> findByUserId(Long userId);
    
    List<Transaction> findByProductId(Long productId);
    
    List<Transaction> findByStatus(TransactionStatus status);
    
    List<Transaction> findByUserIdAndStatus(Long userId, TransactionStatus status);
}
