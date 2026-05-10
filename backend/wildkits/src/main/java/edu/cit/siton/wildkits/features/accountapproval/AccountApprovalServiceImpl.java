package edu.cit.siton.wildkits.features.accountapproval;

import edu.cit.siton.wildkits.common.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.features.accountapproval.dto.AccountApprovalRequestDTO;
import edu.cit.siton.wildkits.features.accountapproval.dto.AccountApprovalResponseDTO;
import edu.cit.siton.wildkits.features.admin.Admin;
import edu.cit.siton.wildkits.features.admin.AdminRepository;
import edu.cit.siton.wildkits.features.user.User;
import edu.cit.siton.wildkits.features.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AccountApprovalServiceImpl implements AccountApprovalService {

    private final AccountApprovalRepository approvalRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final AccountApprovalMapper approvalMapper;

    @Override
    public AccountApprovalResponseDTO approveUser(AccountApprovalRequestDTO requestDTO) {
        log.info("Processing approval for user ID: {}", requestDTO.getUserId());

        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + requestDTO.getUserId()));

        Admin admin = adminRepository.findById(requestDTO.getAdminId())
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + requestDTO.getAdminId()));

        AccountApproval approval = approvalMapper.toEntity(requestDTO, user, admin);
        AccountApproval savedApproval = approvalRepository.save(approval);

        log.info("Approval created successfully with ID: {}", savedApproval.getApprovalId());
        return approvalMapper.toResponseDTO(savedApproval);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountApprovalResponseDTO> getAllApprovals() {
        log.info("Fetching all approvals");

        return approvalRepository.findAll().stream()
                .map(approvalMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountApprovalResponseDTO> getPendingApprovals() {
        log.info("Fetching pending approvals");

        return approvalRepository.findByStatus(ApprovalStatus.PENDING).stream()
                .map(approvalMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AccountApprovalResponseDTO getApprovalById(Long approvalId) {
        log.info("Fetching approval with ID: {}", approvalId);

        AccountApproval approval = approvalRepository.findById(approvalId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval not found with ID: " + approvalId));

        return approvalMapper.toResponseDTO(approval);
    }
}