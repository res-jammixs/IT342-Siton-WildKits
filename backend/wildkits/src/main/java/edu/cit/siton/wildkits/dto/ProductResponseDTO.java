package edu.cit.siton.wildkits.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import edu.cit.siton.wildkits.enums.ProductStatus;
import edu.cit.siton.wildkits.enums.ProductType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDTO {

    private Long productId;
    private String title;
    private String description;
    private BigDecimal price;
    private String category;
    private String condition;
    private String imageUrl;
    private ProductType type;
    private ProductStatus status;
    private LocalDateTime createdAt;
    private UUID userId;
    private String userName;
}
