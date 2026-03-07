-- WildKits Database Migration Script for UUID Conversion
-- This script converts user_id from BIGSERIAL to UUID
-- Run this in Supabase SQL Editor

-- ============================================================================
-- IMPORTANT: BACKUP YOUR DATABASE BEFORE RUNNING THIS MIGRATION
-- This is a complex migration that recreates tables and relationships
-- ============================================================================

-- ============================================================================
-- OPTION A: For clean database (no existing users) - RECOMMENDED
-- ============================================================================
-- Use this if you can afford to start fresh with your users table

-- Step 1: Drop existing tables (WARNING: This deletes all data)
DROP TABLE IF EXISTS account_approvals CASCADE;
DROP TABLE IF EXISTS product_reports CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Step 2: Create users table with UUID primary key
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    year_level VARCHAR(20) NOT NULL,
    account_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_student_id ON users(student_id);
CREATE INDEX idx_users_account_status ON users(account_status);

-- Step 4: Recreate dependent tables with UUID foreign keys
CREATE TABLE products (
    product_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    product_type VARCHAR(20) NOT NULL,
    product_status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL,
    deleted_by_admin_id BIGINT,
    CONSTRAINT fk_products_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transaction_id BIGSERIAL PRIMARY KEY,
    transaction_type VARCHAR(20) NOT NULL,
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    user_id UUID NOT NULL,
    product_id BIGINT NOT NULL,
    CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_transactions_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE product_reports (
    report_id BIGSERIAL PRIMARY KEY,
    reason TEXT NOT NULL,
    report_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    reporter_user_id UUID NOT NULL,
    product_id BIGINT NOT NULL,
    reviewed_by_admin_id BIGINT,
    CONSTRAINT fk_reports_reporter FOREIGN KEY (reporter_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_reports_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE account_approvals (
    approval_id BIGSERIAL PRIMARY KEY,
    approval_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    user_id UUID NOT NULL UNIQUE,
    admin_id BIGINT NOT NULL,
    CONSTRAINT fk_approvals_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Step 5: Create indexes on foreign keys
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_product_id ON transactions(product_id);
CREATE INDEX idx_product_reports_reporter_id ON product_reports(reporter_user_id);
CREATE INDEX idx_product_reports_product_id ON product_reports(product_id);
CREATE INDEX idx_account_approvals_user_id ON account_approvals(user_id);

-- ============================================================================
-- OPTION B: For databases with existing data (ADVANCED - USE WITH CAUTION)
-- ============================================================================
-- This preserves existing data by creating mapping tables
-- WARNING: Requires manual intervention for each foreign key relationship

-- Step 1: Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Create new users table with UUID
CREATE TABLE users_new (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    old_user_id BIGINT UNIQUE,  -- Temporary mapping column
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    year_level VARCHAR(20) NOT NULL,
    account_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Copy data from old table
-- INSERT INTO users_new (old_user_id, name, email, password, student_id, department, year_level, account_status, created_at)
-- SELECT user_id, name, email, password, student_id, department, year_level, account_status, created_at
-- FROM users;

-- Step 4: Update foreign key tables (example for products)
-- ALTER TABLE products ADD COLUMN new_user_id UUID;
-- UPDATE products p 
-- SET new_user_id = (SELECT user_id FROM users_new WHERE old_user_id = p.user_id);
-- ALTER TABLE products DROP CONSTRAINT products_user_id_fkey;
-- ALTER TABLE products DROP COLUMN user_id;
-- ALTER TABLE products RENAME COLUMN new_user_id TO user_id;
-- ALTER TABLE products ADD CONSTRAINT products_user_id_fkey 
--     FOREIGN KEY (user_id) REFERENCES users_new(user_id) ON DELETE CASCADE;

-- Repeat Step 4 for: transactions, product_reports, account_approvals

-- Step 5: Replace old table
-- DROP TABLE users CASCADE;
-- ALTER TABLE users_new RENAME TO users;
-- ALTER TABLE users DROP COLUMN old_user_id;

-- Step 6: Create indexes
-- CREATE INDEX idx_users_email ON users(email);
-- CREATE INDEX idx_users_student_id ON users(student_id);
-- CREATE INDEX idx_users_account_status ON users(account_status);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check users table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Verify UUID format
-- SELECT user_id, name, email FROM users LIMIT 5;

-- Check foreign key relationships
-- SELECT
--     tc.table_name, 
--     kcu.column_name,
--     ccu.table_name AS foreign_table_name,
--     ccu.column_name AS foreign_column_name 
-- FROM information_schema.table_constraints AS tc 
-- JOIN information_schema.key_column_usage AS kcu
--     ON tc.constraint_name = kcu.constraint_name
--     AND tc.table_schema = kcu.table_schema
-- JOIN information_schema.constraint_column_usage AS ccu
--     ON ccu.constraint_name = tc.constraint_name
--     AND ccu.table_schema = tc.table_schema
-- WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name IN ('products', 'transactions', 'product_reports', 'account_approvals');
