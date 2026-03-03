-- ============================================================
-- MoneyWise - Database Schema
-- Backend: Go
-- ============================================================



-- TABLE: users
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100)        NOT NULL,
    last_name   VARCHAR(100)        NOT NULL,
    email       VARCHAR(255)        NOT NULL UNIQUE,
    password    VARCHAR(255)        NOT NULL,  
    is_active   BOOLEAN             NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMP WITH TIME ZONE         
);

CREATE INDEX idx_users_email      ON users(email);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);

-- TABLE: categories
CREATE TABLE IF NOT EXISTS categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL UNIQUE,  
    icon        VARCHAR(100),                  
    color       VARCHAR(7),                      
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


-- TABLE: images
CREATE TABLE IF NOT EXISTS images (
    id              SERIAL PRIMARY KEY,
    url             TEXT NOT NULL,       
    filename        VARCHAR(255),
    mime_type       VARCHAR(50),                  -- image/jpeg, image/png
    size_bytes      BIGINT,
    uploaded_by     INTEGER,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_images_uploaded_by ON images(uploaded_by);

-- TABLE: transactions
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

CREATE TABLE IF NOT EXISTS transactions (
    id               SERIAL PRIMARY KEY,
    user_id          INTEGER NOT NULL,
    category_id      INTEGER NOT NULL,
    image_id         INTEGER,
    type            transaction_type NOT NULL,    
    title           VARCHAR(150) NOT NULL,
    description     TEXT,                       
    amount          NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    date            DATE         NOT NULL DEFAULT CURRENT_DATE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMP WITH TIME ZONE,       
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE SET NULL


);

CREATE INDEX idx_transactions_user_id    ON transactions(user_id);
CREATE INDEX idx_transactions_category   ON transactions(category_id);
CREATE INDEX idx_transactions_type       ON transactions(type);
CREATE INDEX idx_transactions_date       ON transactions(date DESC);
CREATE INDEX idx_transactions_deleted_at ON transactions(deleted_at);

-- Composite index for dashboard queries (user + month filter)
CREATE INDEX idx_transactions_user_date  ON transactions(user_id, date DESC);


-- FUNCTION: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();