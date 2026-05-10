package edu.cit.siton.wildkits.features.transaction;

import edu.cit.siton.wildkits.features.transaction.dto.TransactionRequestDTO;
import edu.cit.siton.wildkits.features.transaction.dto.TransactionResponseDTO;

import java.util.List;
import java.util.UUID;

public interface TransactionService {

    TransactionResponseDTO createTransaction(TransactionRequestDTO requestDTO);

    TransactionResponseDTO getTransactionById(Long transactionId);

    List<TransactionResponseDTO> getAllTransactions();

    List<TransactionResponseDTO> getTransactionsByUserId(UUID userId);

    List<TransactionResponseDTO> getTransactionsByProductId(Long productId);
}