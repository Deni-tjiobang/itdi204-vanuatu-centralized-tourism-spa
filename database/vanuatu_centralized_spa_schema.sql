-- VANUATU CENTRALIZED SPA DATABASE SCHEMA
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    country TEXT,
    dob DATE,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- In production, this should be hashed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACCOMMODATIONS
CREATE TABLE accommodations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    location TEXT,
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CAR RENTALS
CREATE TABLE car_rentals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    services TEXT,
    location TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TOUR OPERATORS
CREATE TABLE tour_operators (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    services TEXT,
    location TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS managers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);