package com.wildkits.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildkits.entity.Product;
import com.wildkits.enums.ProductStatus;
import com.wildkits.enums.ProductType;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByUserId(Long userId);
    
    List<Product> findByStatus(ProductStatus status);
    
    List<Product> findByType(ProductType type);
    
    List<Product> findByStatusAndType(ProductStatus status, ProductType type);
}
