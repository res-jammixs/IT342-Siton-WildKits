package com.wildkits.service;

import java.util.List;

import com.wildkits.dto.TransactionRequestDTO;
import com.wildkits.dto.TransactionResponseDTO;

public interface TransactionService {
    
    TransactionResponseDTO createTransaction(TransactionRequestDTO requestDTO);
    
    TransactionResponseDTO getTransactionById(Long transactionId);
    
    List<TransactionResponseDTO> getAllTransactions();
    
    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);
    
    List<TransactionResponseDTO> getTransactionsByProductId(Long productId);
}
