package com.wildkits.service;

import java.util.List;
import java.util.UUID;

import com.wildkits.dto.TransactionRequestDTO;
import com.wildkits.dto.TransactionResponseDTO;

public interface TransactionService {
    
    TransactionResponseDTO createTransaction(TransactionRequestDTO requestDTO);
    
    TransactionResponseDTO getTransactionById(Long transactionId);
    
    List<TransactionResponseDTO> getAllTransactions();
    
    List<TransactionResponseDTO> getTransactionsByUserId(UUID userId);
    
    List<TransactionResponseDTO> getTransactionsByProductId(Long productId);
}
