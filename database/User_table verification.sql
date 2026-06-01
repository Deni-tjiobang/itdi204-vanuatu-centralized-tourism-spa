DELETE FROM users;

SELECT column_name
FROM information_schema.columns
WHERE table_name = 'users';

ALTER TABLE users
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN country TEXT,
ADD COLUMN dob DATE;