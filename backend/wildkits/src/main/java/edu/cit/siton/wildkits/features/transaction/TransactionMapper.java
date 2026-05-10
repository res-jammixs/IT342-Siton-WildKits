package edu.cit.siton.wildkits.features.transaction;

import edu.cit.siton.wildkits.features.product.Product;
import edu.cit.siton.wildkits.features.transaction.dto.TransactionRequestDTO;
import edu.cit.siton.wildkits.features.transaction.dto.TransactionResponseDTO;
import edu.cit.siton.wildkits.features.user.User;
import org.springframework.stereotype.Component;

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
                .productId(transaction.getProduct() != null ? transaction.getProduct().getProductId() : null)
                .build();
    }
}