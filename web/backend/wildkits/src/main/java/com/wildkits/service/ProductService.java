package com.wildkits.service;

import java.util.List;

import com.wildkits.dto.ProductRequestDTO;
import com.wildkits.dto.ProductResponseDTO;

public interface ProductService {
    
    ProductResponseDTO createProduct(ProductRequestDTO requestDTO);
    
    ProductResponseDTO getProductById(Long productId);
    
    List<ProductResponseDTO> getAllProducts();
    
    List<ProductResponseDTO> getProductsByUserId(Long userId);
    
    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO requestDTO);
    
    void deleteProduct(Long productId);
}
