package com.wildkits.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.wildkits.enums.TransactionStatus;
import com.wildkits.enums.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String userName;
    private Long productId;
    private String productTitle;
}
