DROP DATABASE IF EXISTS MediaShare;
CREATE DATABASE MediaShare;
USE MediaShare;

-- Creates users table that is used to store data about users
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Creates media items table that is used to store data about the media items users post
CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Creates mood table that is used to store data about users rating media items based on mood from 1 to 5
CREATE TABLE Mood (
  mood_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  media_id INT NOT NULL,
  mood TINYINT NOT NULL CHECK (mood BETWEEN 1 AND 5),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (mood_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  UNIQUE (user_id, media_id)
);

-- Creates media popularity table that is used to track data about media items popularity based on user ratings
CREATE TABLE MediaPopularity (
  log_id INT NOT NULL AUTO_INCREMENT,
  media_id INT NOT NULL,
  avg_rating DECIMAL(3,2) NOT NULL,
  rating_count INT NOT NULL,
  log_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (log_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id)
);

-- Insert mock data into all tables
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

INSERT INTO Mood (user_id, media_id, mood) VALUES
  (305, 1, 4),
  (305, 2, 5),
  (260, 3, 3);

INSERT INTO MediaPopularity (media_id, avg_rating, rating_count) VALUES
  (1, 4.00, 1),
  (2, 5.00, 1),
  (3, 3.00, 1);


-- How to query data:

-- Get all media items with the username of who posted it
SELECT m.media_id, m.title, m.filename, u.username
FROM MediaItems m
JOIN Users u ON m.user_id = u.user_id;

-- Get all mood ratings for a specific media item
SELECT u.username, m.mood, m.created_at
FROM Mood m
JOIN Users u ON m.user_id = u.user_id
WHERE m.media_id = 1;

-- Show average mood score for each media item
SELECT mi.media_id, mi.title, AVG(m.mood) AS avg_mood, COUNT(m.mood) AS ratings
FROM MediaItems mi
JOIN Mood m ON mi.media_id = m.media_id
GROUP BY mi.media_id, mi.title;


-- How to update data

-- Update a mood rating
UPDATE Mood
SET mood = 5
WHERE user_id = 260 AND media_id = 3;

-- Update a media item title and description
UPDATE MediaItems
SET title = 'Updated Title', description = 'New description text.'
WHERE media_id = 2;

-- Update user email
UPDATE Users
SET email = 'newemail@example.com'
WHERE user_id = 305;


-- How to delete data

-- Delete a mood rating
DELETE FROM Mood
WHERE user_id = 260 AND media_id = 3;

-- Delete a media item
DELETE FROM MediaItems
WHERE media_id = 1;

-- Delete a user
DELETE FROM Users
WHERE user_id = 305;


-- Query popularity
SELECT mi.title, mp.avg_rating, mp.rating_count, mp.log_date
FROM MediaPopularity mp
JOIN MediaItems mi ON mp.media_id = mi.media_id;
