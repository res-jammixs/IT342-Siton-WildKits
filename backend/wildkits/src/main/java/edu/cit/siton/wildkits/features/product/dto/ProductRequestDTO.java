package edu.cit.siton.wildkits.features.product.dto;

import edu.cit.siton.wildkits.features.product.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequestDTO {
    private String title;
    private String description;
    private BigDecimal price;
    private ProductType type;
    private String category;
    private String condition;
    private String imageUrl;
    private UUID userId;
}