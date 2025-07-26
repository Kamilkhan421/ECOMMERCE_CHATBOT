CREATE TABLE distribution_centers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    cost NUMERIC,
    category TEXT,
    name TEXT,
    brand TEXT,
    retail_price NUMERIC,
    department TEXT,
    sku TEXT,
    distribution_center_id INT REFERENCES distribution_centers(id)
);

CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    created_at TIMESTAMP,
    sold_at TIMESTAMP,
    cost NUMERIC,
    product_category TEXT,
    product_name TEXT,
    product_brand TEXT,
    product_retail_price NUMERIC,
    product_department TEXT,
    product_sku TEXT,
    product_distribution_center_id INT REFERENCES distribution_centers(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    age INT,
    gender TEXT,
    state TEXT,
    street_address TEXT,
    postal_code TEXT,
    city TEXT,
    country TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    traffic_source TEXT,
    created_at TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    status TEXT,
    gender TEXT,
    created_at TIMESTAMP,
    returned_at TIMESTAMP,
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    num_of_item INT
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    inventory_item_id INT REFERENCES inventory_items(id),
    status TEXT,
    created_at TIMESTAMP,
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    returned_at TIMESTAMP
);
