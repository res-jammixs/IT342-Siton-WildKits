-- Product listing migration for Supabase
-- Adds fields needed for full Sell/Lend listings with image support.

-- 1) Ensure products table exists with required base shape
CREATE TABLE IF NOT EXISTS products (
    product_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    product_type VARCHAR(20) NOT NULL,
    product_status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2) Ensure listing-specific columns exist
ALTER TABLE products
    ADD COLUMN IF NOT EXISTS category VARCHAR(100),
    ADD COLUMN IF NOT EXISTS item_condition VARCHAR(50),
    ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- 3) Backfill + enforce category requirement
UPDATE products
SET category = 'other'
WHERE category IS NULL OR TRIM(category) = '';

ALTER TABLE products
    ALTER COLUMN category SET NOT NULL;

-- 4) Helpful index for browsing and filtering
CREATE INDEX IF NOT EXISTS idx_products_type_status_created
    ON products (product_type, product_status, created_at DESC);

-- 5) Ensure product images storage bucket exists
INSERT INTO storage.buckets (id, name, public)
SELECT 'product-images', 'product-images', TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'product-images'
);

-- 6) Basic public read policy for product images
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'Public read product images'
    ) THEN
        CREATE POLICY "Public read product images"
        ON storage.objects
        FOR SELECT
        USING (bucket_id = 'product-images');
    END IF;
END $$;
