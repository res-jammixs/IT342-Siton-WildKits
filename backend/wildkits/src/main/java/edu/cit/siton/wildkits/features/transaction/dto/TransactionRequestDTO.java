package edu.cit.siton.wildkits.features.transaction.dto;

import edu.cit.siton.wildkits.features.transaction.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionRequestDTO {
    private TransactionType type;
    private UUID userId;
    private Long productId;
}