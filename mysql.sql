CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `username` varchar(50) NOT NULL,
  `postedAt` varchar(255) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `title` varchar(400) NOT NULL UNIQUE,
  `image` varchar(75) NOT NULL,
  `tags` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE table Users (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `name` varchar(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(75) NOT NULL
);

CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `postId` int DEFAULT NOT NULL,
  `postedAt` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`)
);

ALTER Table Users auto_increment=1001;
