package com.wildkits.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.wildkits.enums.ProductStatus;
import com.wildkits.enums.ProductType;

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
    private ProductType type;
    private ProductStatus status;
    private LocalDateTime createdAt;
    private Long userId;
    private String userName;
}
