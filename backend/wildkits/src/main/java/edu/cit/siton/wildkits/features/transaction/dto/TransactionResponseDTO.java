package edu.cit.siton.wildkits.features.transaction.dto;

import edu.cit.siton.wildkits.features.transaction.TransactionStatus;
import edu.cit.siton.wildkits.features.transaction.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionResponseDTO {
    private Long transactionId;
    private TransactionType type;
    private LocalDateTime transactionDate;
    private TransactionStatus status;
    private UUID userId;
    private Long productId;
}