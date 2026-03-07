package edu.cit.siton.wildkits.service;

import java.util.List;
import java.util.UUID;

import edu.cit.siton.wildkits.dto.TransactionRequestDTO;
import edu.cit.siton.wildkits.dto.TransactionResponseDTO;

public interface TransactionService {
    
    TransactionResponseDTO createTransaction(TransactionRequestDTO requestDTO);
    
    TransactionResponseDTO getTransactionById(Long transactionId);
    
    List<TransactionResponseDTO> getAllTransactions();
    
    List<TransactionResponseDTO> getTransactionsByUserId(UUID userId);
    
    List<TransactionResponseDTO> getTransactionsByProductId(Long productId);
}
