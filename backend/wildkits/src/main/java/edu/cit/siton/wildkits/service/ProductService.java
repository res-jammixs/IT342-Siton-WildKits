package edu.cit.siton.wildkits.service;

import java.util.List;
import java.util.UUID;

import edu.cit.siton.wildkits.dto.ProductRequestDTO;
import edu.cit.siton.wildkits.dto.ProductResponseDTO;

public interface ProductService {
    
    ProductResponseDTO createProduct(ProductRequestDTO requestDTO);
    
    ProductResponseDTO getProductById(Long productId);
    
    List<ProductResponseDTO> getAllProducts();
    
    List<ProductResponseDTO> getProductsByUserId(UUID userId);
    
    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO requestDTO);
    
    void deleteProduct(Long productId);
}
