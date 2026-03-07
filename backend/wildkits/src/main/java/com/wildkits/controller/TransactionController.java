package com.wildkits.controller;

import com.wildkits.dto.TransactionRequestDTO;
import com.wildkits.dto.TransactionResponseDTO;
import com.wildkits.service.TransactionService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> createTransaction(@Valid @RequestBody TransactionRequestDTO requestDTO) {
        log.info("Received request to create transaction for user ID: {}", requestDTO.getUserId());
        TransactionResponseDTO response = transactionService.createTransaction(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        log.info("Received request to get all transactions");
        List<TransactionResponseDTO> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> getTransactionById(@PathVariable("id") Long transactionId) {
        log.info("Received request to get transaction with ID: {}", transactionId);
        TransactionResponseDTO transaction = transactionService.getTransactionById(transactionId);
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByUserId(@PathVariable("userId") Long userId) {
        log.info("Received request to get transactions for user ID: {}", userId);
        List<TransactionResponseDTO> transactions = transactionService.getTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByProductId(@PathVariable("productId") Long productId) {
        log.info("Received request to get transactions for product ID: {}", productId);
        List<TransactionResponseDTO> transactions = transactionService.getTransactionsByProductId(productId);
        return ResponseEntity.ok(transactions);
    }
}
