package com.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wildkits.dto.ProductRequestDTO;
import com.wildkits.dto.ProductResponseDTO;
import com.wildkits.entity.Product;
import com.wildkits.entity.User;
import com.wildkits.enums.ProductStatus;
import com.wildkits.exception.ResourceNotFoundException;
import com.wildkits.mapper.ProductMapper;
import com.wildkits.repository.ProductRepository;
import com.wildkits.repository.UserRepository;
import com.wildkits.service.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO requestDTO) {
        log.info("Creating new product with title: {}", requestDTO.getTitle());
        
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getUserId()));
        
        Product product = productMapper.toEntity(requestDTO, user);
        Product savedProduct = productRepository.save(product);
        
        log.info("Product created successfully with ID: {}", savedProduct.getProductId());
        return productMapper.toResponseDTO(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long productId) {
        log.info("Fetching product with ID: {}", productId);
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        
        return productMapper.toResponseDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllProducts() {
        log.info("Fetching all products");
        
        return productRepository.findAll().stream()
                .map(productMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getProductsByUserId(Long userId) {
        log.info("Fetching products for user ID: {}", userId);
        
        return productRepository.findByUserId(userId).stream()
                .map(productMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO updateProduct(Long productId, ProductRequestDTO requestDTO) {
        log.info("Updating product with ID: {}", productId);
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        
        product.setTitle(requestDTO.getTitle());
        product.setDescription(requestDTO.getDescription());
        product.setPrice(requestDTO.getPrice());
        product.setType(requestDTO.getType());
        
        Product updatedProduct = productRepository.save(product);
        
        log.info("Product updated successfully with ID: {}", updatedProduct.getProductId());
        return productMapper.toResponseDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        log.info("Deleting product with ID: {}", productId);
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
        
        product.setStatus(ProductStatus.UNAVAILABLE);
        productRepository.save(product);
        
        log.info("Product marked as unavailable with ID: {}", productId);
    }
}
