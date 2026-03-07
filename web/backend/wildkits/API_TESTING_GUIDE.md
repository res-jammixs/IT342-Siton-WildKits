# WildKits API Testing Guide

This guide provides sample API requests for testing the WildKits backend.

## Base URL
```
http://localhost:8080
```

---

## 1. User Registration & Management

### Register a New User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "Juan Dela Cruz",
  "email": "juan.delacruz@cit.edu",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "userId": 1,
  "name": "Juan Dela Cruz",
  "email": "juan.delacruz@cit.edu",
  "accountStatus": "PENDING",
  "createdAt": "2026-03-07T10:30:00"
}
```

### Get All Users
```http
GET /api/users
```

### Get User by ID
```http
GET /api/users/1
```

### Update User
```http
PUT /api/users/1
Content-Type: application/json

{
  "name": "Juan Updated",
  "email": "juan.updated@cit.edu",
  "password": "newpassword123"
}
```

### Delete User
```http
DELETE /api/users/1
```

---

## 2. Admin Management

### Create Admin
```http
POST /api/admins
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@cit.edu"
}
```

**Response (201 Created):**
```json
{
  "adminId": 1,
  "name": "Admin User",
  "email": "admin@cit.edu"
}
```

### Get All Admins
```http
GET /api/admins
```

### Get Admin by ID
```http
GET /api/admins/1
```

---

## 3. Account Approval

### Approve User Account
```http
POST /api/admin/approve-user
Content-Type: application/json

{
  "userId": 1,
  "adminId": 1,
  "status": "APPROVED"
}
```

**Response (201 Created):**
```json
{
  "approvalId": 1,
  "approvalDate": "2026-03-07T11:00:00",
  "status": "APPROVED",
  "userId": 1,
  "userName": "Juan Dela Cruz",
  "adminId": 1,
  "adminName": "Admin User"
}
```

### Get Pending Approvals
```http
GET /api/admin/pending-approvals
```

### Get All Approvals
```http
GET /api/admin/approvals
```

---

## 4. Product Management

### Create a Product (SELL)
```http
POST /api/products
Content-Type: application/json

{
  "title": "Calculus Textbook - 10th Edition",
  "description": "Used calculus textbook in good condition. Includes all chapters and practice problems.",
  "price": 500.00,
  "type": "SELL",
  "userId": 1
}
```

### Create a Product (LEND)
```http
POST /api/products
Content-Type: application/json

{
  "title": "Scientific Calculator",
  "description": "Casio FX-991ES scientific calculator available for lending.",
  "price": 50.00,
  "type": "LEND",
  "userId": 1
}
```

**Response (201 Created):**
```json
{
  "productId": 1,
  "title": "Calculus Textbook - 10th Edition",
  "description": "Used calculus textbook in good condition. Includes all chapters and practice problems.",
  "price": 500.00,
  "type": "SELL",
  "status": "AVAILABLE",
  "createdAt": "2026-03-07T12:00:00",
  "userId": 1,
  "userName": "Juan Dela Cruz"
}
```

### Get All Products
```http
GET /api/products
```

### Get Product by ID
```http
GET /api/products/1
```

### Get Products by User ID
```http
GET /api/products/user/1
```

### Update Product
```http
PUT /api/products/1
Content-Type: application/json

{
  "title": "Calculus Textbook - 10th Edition (Updated)",
  "description": "Updated description with more details.",
  "price": 450.00,
  "type": "SELL",
  "userId": 1
}
```

### Delete Product
```http
DELETE /api/products/1
```
*(Marks product as UNAVAILABLE)*

---

## 5. Transaction Management

### Create a Transaction (BUY)
```http
POST /api/transactions
Content-Type: application/json

{
  "type": "BUY",
  "userId": 2,
  "productId": 1
}
```

### Create a Transaction (LEND)
```http
POST /api/transactions
Content-Type: application/json

{
  "type": "LEND",
  "userId": 2,
  "productId": 2
}
```

**Response (201 Created):**
```json
{
  "transactionId": 1,
  "type": "BUY",
  "transactionDate": "2026-03-07T13:00:00",
  "status": "PENDING",
  "userId": 2,
  "userName": "Maria Santos",
  "productId": 1,
  "productTitle": "Calculus Textbook - 10th Edition"
}
```

### Get All Transactions
```http
GET /api/transactions
```

### Get Transaction by ID
```http
GET /api/transactions/1
```

### Get Transactions by User ID
```http
GET /api/transactions/user/2
```

### Get Transactions by Product ID
```http
GET /api/transactions/product/1
```

---

## 6. Product Reports

### Create a Report
```http
POST /api/reports
Content-Type: application/json

{
  "reason": "This product listing contains inappropriate content and violates community guidelines.",
  "reporterUserId": 3,
  "productId": 1
}
```

**Response (201 Created):**
```json
{
  "reportId": 1,
  "reason": "This product listing contains inappropriate content and violates community guidelines.",
  "reportDate": "2026-03-07T14:00:00",
  "status": "PENDING",
  "reporterUserId": 3,
  "reporterName": "Pedro Garcia",
  "productId": 1,
  "productTitle": "Calculus Textbook - 10th Edition",
  "reviewedByAdminId": null,
  "reviewedByAdminName": null
}
```

### Get All Reports
```http
GET /api/reports
```

### Get Report by ID
```http
GET /api/reports/1
```

### Get Pending Reports
```http
GET /api/reports/pending
```

### Review a Report (Admin)
```http
PUT /api/reports/1/review?adminId=1
```

**Response (200 OK):**
```json
{
  "reportId": 1,
  "reason": "This product listing contains inappropriate content and violates community guidelines.",
  "reportDate": "2026-03-07T14:00:00",
  "status": "REVIEWED",
  "reporterUserId": 3,
  "reporterName": "Pedro Garcia",
  "productId": 1,
  "productTitle": "Calculus Textbook - 10th Edition",
  "reviewedByAdminId": 1,
  "reviewedByAdminName": "Admin User"
}
```

---

## Error Response Examples

### 404 Not Found
```json
{
  "timestamp": "2026-03-07T15:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found with ID: 999",
  "path": "/api/users/999"
}
```

### 400 Validation Error
```json
{
  "timestamp": "2026-03-07T15:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users/register",
  "validationErrors": {
    "email": "Email must be valid",
    "name": "Name is required",
    "password": "Password must be between 6 and 100 characters"
  }
}
```

### 409 Conflict (Duplicate)
```json
{
  "timestamp": "2026-03-07T15:00:00",
  "status": 409,
  "error": "Conflict",
  "message": "User with email juan.delacruz@cit.edu already exists",
  "path": "/api/users/register"
}
```

---

## Testing Workflow Example

1. **Create Admin**
   ```
   POST /api/admins
   ```

2. **Register User**
   ```
   POST /api/users/register
   ```

3. **Approve User**
   ```
   POST /api/admin/approve-user
   ```

4. **Create Product**
   ```
   POST /api/products
   ```

5. **Create Transaction**
   ```
   POST /api/transactions
   ```

6. **Create Report (if needed)**
   ```
   POST /api/reports
   ```

7. **Admin Reviews Report**
   ```
   PUT /api/reports/{id}/review?adminId=1
   ```

---

## Enums Reference

### ProductType
- `SELL` - Product for sale
- `LEND` - Product for lending

### ProductStatus
- `AVAILABLE` - Product is available
- `SOLD` - Product has been sold
- `LENT_OUT` - Product is currently lent out
- `UNAVAILABLE` - Product is no longer available

### TransactionType
- `BUY` - Purchase transaction
- `LEND` - Lending transaction

### TransactionStatus
- `PENDING` - Transaction pending
- `COMPLETED` - Transaction completed
- `CANCELLED` - Transaction cancelled
- `RETURNED` - Item returned (for lend)

### AccountStatus
- `PENDING` - Account awaiting approval
- `APPROVED` - Account approved
- `REJECTED` - Account rejected
- `SUSPENDED` - Account suspended

### ApprovalStatus
- `PENDING` - Approval pending
- `APPROVED` - Approved
- `REJECTED` - Rejected

### ReportStatus
- `PENDING` - Report pending review
- `REVIEWED` - Report reviewed
- `RESOLVED` - Issue resolved
- `DISMISSED` - Report dismissed

---

## Tools for Testing

### Recommended Tools:
1. **Postman** - https://www.postman.com/
2. **Insomnia** - https://insomnia.rest/
3. **cURL** (Command line)
4. **VS Code REST Client Extension**

### Import into Postman:
Save the above requests as individual requests in a Postman collection for easy testing.

---

**Happy Testing! 🚀**
