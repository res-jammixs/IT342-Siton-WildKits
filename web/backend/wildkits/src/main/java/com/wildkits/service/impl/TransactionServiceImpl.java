package com.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wildkits.dto.TransactionRequestDTO;
import com.wildkits.dto.TransactionResponseDTO;
import com.wildkits.entity.Product;
import com.wildkits.entity.Transaction;
import com.wildkits.entity.User;
import com.wildkits.exception.ResourceNotFoundException;
import com.wildkits.mapper.TransactionMapper;
import com.wildkits.repository.ProductRepository;
import com.wildkits.repository.TransactionRepository;
import com.wildkits.repository.UserRepository;
import com.wildkits.service.TransactionService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final TransactionMapper transactionMapper;

    @Override
    public TransactionResponseDTO createTransaction(TransactionRequestDTO requestDTO) {
        log.info("Creating new transaction for user ID: {} and product ID: {}", 
                requestDTO.getUserId(), requestDTO.getProductId());
        
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getUserId()));
        
        Product product = productRepository.findById(requestDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + requestDTO.getProductId()));
        
        Transaction transaction = transactionMapper.toEntity(requestDTO, user, product);
        Transaction savedTransaction = transactionRepository.save(transaction);
        
        log.info("Transaction created successfully with ID: {}", savedTransaction.getTransactionId());
        return transactionMapper.toResponseDTO(savedTransaction);
    }

    @Override
    @Transactional(readOnly = true)
    public TransactionResponseDTO getTransactionById(Long transactionId) {
        log.info("Fetching transaction with ID: {}", transactionId);
        
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + transactionId));
        
        return transactionMapper.toResponseDTO(transaction);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransactionResponseDTO> getAllTransactions() {
        log.info("Fetching all transactions");
        
        return transactionRepository.findAll().stream()
                .map(transactionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransactionResponseDTO> getTransactionsByUserId(Long userId) {
        log.info("Fetching transactions for user ID: {}", userId);
        
        return transactionRepository.findByUserId(userId).stream()
                .map(transactionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TransactionResponseDTO> getTransactionsByProductId(Long productId) {
        log.info("Fetching transactions for product ID: {}", productId);
        
        return transactionRepository.findByProductId(productId).stream()
                .map(transactionMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
