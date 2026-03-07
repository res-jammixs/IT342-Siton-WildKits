package com.wildkits.mapper;

import org.springframework.stereotype.Component;

import com.wildkits.dto.TransactionRequestDTO;
import com.wildkits.dto.TransactionResponseDTO;
import com.wildkits.entity.Product;
import com.wildkits.entity.Transaction;
import com.wildkits.entity.User;
import com.wildkits.enums.TransactionStatus;

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
