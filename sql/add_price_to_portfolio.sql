-- Add price column to portfolio_items table
ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS price TEXT;

-- Comment: Using TEXT instead of NUMERIC to allow flexible formatting (e.g., "Mulai 50rb" or "50.000")
-- but you can change it to NUMERIC if you prefer strictly numbers.
