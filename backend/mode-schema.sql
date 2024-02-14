CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT,
    image TEXT NOT NULL
);

CREATE TABLE orderItems ( 
  id SERIAL PRIMARY KEY,   
  order_id INTEGER REFERENCES orders (order_id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products (id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  order_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders ( 
  order_id INTEGER PRIMARY KEY,
  user_id VARCHAR(25) REFERENCES users (username) ON DELETE CASCADE,  
  total_price INTEGER NOT NULL  
);

-- CREATE TABLE transactions (
--   transaction_id SERIAL PRIMARY KEY,
--   user_id VARCHAR(25) REFERENCES users (username) ON DELETE CASCADE,
--   product_id INTEGER REFERENCES products (id) ON DELETE CASCADE,
--   quantity INTEGER NOT NULL,
--   total_price INTEGER NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );
