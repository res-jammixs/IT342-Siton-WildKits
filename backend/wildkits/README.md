# WildKits Backend - Spring Boot Application

WildKits is a **campus-exclusive peer-to-peer marketplace** for CIT-U students (Technologians) to buy, sell, and lend academic items.

## Technology Stack

- **Java 17**
- **Spring Boot 4.0.3**
- **Spring Data JPA**
- **PostgreSQL** (Supabase)
- **HikariCP** (Connection Pooling)
- **Lombok**
- **Jakarta Validation**
- **Maven**

## Architecture

Clean layered architecture following best practices:

```
com.wildkits
├── config          - Configuration classes
├── controller      - REST Controllers
├── service         - Service interfaces
├── service.impl    - Service implementations
├── repository      - JPA Repositories
├── entity          - JPA Entities
├── dto             - Data Transfer Objects
├── mapper          - Entity-DTO Mappers
├── exception       - Custom exceptions & handlers
└── enums           - Enum types
```

## Database Configuration

The application connects to **Supabase PostgreSQL** using the Session Pooler.

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
SUPABASE_DB_URL=jdbc:postgresql://aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres
SUPABASE_DB_USER=postgres.qgofibwesdynvlnwnkgz
SUPABASE_DB_PASSWORD=wildkits_123!
```

### Connection Pool Settings

- Maximum Pool Size: 10
- Minimum Idle: 2
- Connection Timeout: 30 seconds

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL client (optional)

### Installation

1. **Clone the repository**
   ```bash
   cd backend/wildkits
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

3. **Build the project**
   ```bash
   ./mvnw clean install
   ```

4. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Products
- `POST /api/products` - Create a product
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/user/{userId}` - Get products by user
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Transactions
- `POST /api/transactions` - Create a transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `GET /api/transactions/user/{userId}` - Get transactions by user
- `GET /api/transactions/product/{productId}` - Get transactions by product

### Product Reports
- `POST /api/reports` - Create a report
- `GET /api/reports` - Get all reports
- `GET /api/reports/{id}` - Get report by ID
- `GET /api/reports/pending` - Get pending reports
- `PUT /api/reports/{id}/review?adminId={adminId}` - Review a report

### Admin & Approvals
- `POST /api/admin/approve-user` - Approve/reject user account
- `GET /api/admin/pending-approvals` - Get pending approvals
- `GET /api/admin/approvals` - Get all approvals
- `POST /api/admins` - Create admin
- `GET /api/admins` - Get all admins
- `GET /api/admins/{id}` - Get admin by ID

## Entity Relationship Overview

- **User** → creates → **Product**
- **User** → makes → **Transaction**
- **Product** → involved in → **Transaction**
- **User** → submits → **ProductReport**
- **Admin** → manages → **AccountApproval**
- **Admin** → reviews → **ProductReport**

## Database Schema

Tables are automatically created/updated via Hibernate with `ddl-auto: update`.

Main entities:
- `users`
- `admins`
- `products`
- `transactions`
- `product_reports`
- `account_approvals`

## Development

### Running Tests
```bash
./mvnw test
```

### Building for Production
```bash
./mvnw clean package -DskipTests
java -jar target/wildkits-0.0.1-SNAPSHOT.jar
```

## Logging

Application logs include:
- SQL queries (when `show-sql: true`)
- Service-level operations
- Request/response logging
- Exception details

Check console output or configure logging to file in `application.yml`.

## Error Handling

Global exception handler provides consistent error responses:

```json
{
  "timestamp": "2026-03-07T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found with ID: 123",
  "path": "/api/users/123"
}
```

Validation errors include field-specific messages.

## Security Notes

⚠️ **Important**: The current implementation does not include authentication/authorization. For production:
- Implement Spring Security
- Add JWT or OAuth2
- Encrypt passwords (BCrypt)
- Secure sensitive endpoints
- Use HTTPS

## Contributing

This is a student project for CIT-U Technologians.

## License

Academic use only - CIT-U 2026
