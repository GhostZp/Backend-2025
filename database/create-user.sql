CREATE USER 'mediauser1'@'localhost' IDENTIFIED BY 'tosisalainen';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'mediauser1'@'localhost';
FLUSH PRIVILEGES;