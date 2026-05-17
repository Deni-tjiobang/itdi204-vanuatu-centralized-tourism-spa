-- USERS (Signup / Login)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER PREFERENCES (from popup idea)
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    interested_service TEXT,       -- accommodation / tours / car rentals
    preferred_location TEXT,       -- Port Vila / Santo / etc.
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

-- VISITS / ENGAGEMENT TRACKING (YOUR IDEA)
CREATE TABLE user_visits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    page_visited TEXT,
    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);