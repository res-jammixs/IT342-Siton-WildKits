package edu.cit.siton.wildkits.mapper;

import org.springframework.stereotype.Component;

import edu.cit.siton.wildkits.dto.TransactionRequestDTO;
import edu.cit.siton.wildkits.dto.TransactionResponseDTO;
import edu.cit.siton.wildkits.entity.Product;
import edu.cit.siton.wildkits.entity.Transaction;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.TransactionStatus;

@Component
public class TransactionMapper {

    public Transaction toEntity(TransactionRequestDTO dto, User user, Product product) {
        return Transaction.builder()
                .type(dto.getType())
                .status(TransactionStatus.PENDING)
                .user(user)
                .product(product)
                .build();
    }

    public TransactionResponseDTO toResponseDTO(Transaction transaction) {
        return TransactionResponseDTO.builder()
                .transactionId(transaction.getTransactionId())
                .type(transaction.getType())
                .transactionDate(transaction.getTransactionDate())
                .status(transaction.getStatus())
                .userId(transaction.getUser() != null ? transaction.getUser().getUserId() : null)
                .userName(transaction.getUser() != null ? transaction.getUser().getName() : null)
                .productId(transaction.getProduct() != null ? transaction.getProduct().getProductId() : null)
                .productTitle(transaction.getProduct() != null ? transaction.getProduct().getTitle() : null)
                .build();
    }
}
