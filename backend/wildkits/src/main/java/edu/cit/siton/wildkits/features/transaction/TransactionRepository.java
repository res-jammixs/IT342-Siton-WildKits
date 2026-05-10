package edu.cit.siton.wildkits.features.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser_UserId(UUID userId);
    List<Transaction> findByProduct_ProductId(Long productId);
}