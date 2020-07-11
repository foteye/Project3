DROP DATABASE IF EXISTS `warhammerdb`;
CREATE DATABASE `warhammerdb`;

USE `warhammerdb`;

CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL PRIMARY KEY,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL
)

CREATE TABLE `models` (
    `id` VARCHAR(36) NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `faction` VARCHAR(30) NOT NULL,
    `costPerModel` INT NOT NULL,
    `unitLimit` INT NOT NULL
);

CREATE TABLE `units` (
    `id` VARCHAR(36) NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `modelCount` INT NOT NULL,
    `modelType` VARCHAR(36)
);

CREATE TABLE `lists` (
    `id` VARCHAR(36) NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `faction` VARCHAR(30) NOT NULL,
    `maxPoints` INT
);

CREATE TABLE `listMemberships` (
    `unit` VARCHAR(36) NOT NULL,
    `list` VARCHAR(36) NOT NULL,
    PRIMARY KEY (`unit`, `list`),
    CONSTRAINT `constrListMembershipUnitFK`
        FOREIGN KEY `unit_fk` (`unit`) REFERENCES `units` (`id`)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
	CONSTRAINT `constrListMembershipListFK`
        FOREIGN KEY `list_fk` (`list`) REFERENCES `lists` (`id`)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE `userLists` (
    `user` VARCHAR(36) NOT NULL,
    `list` VARCHAR(36) NOT NULL,
    PRIMARY KEY (`user`, `list`),
    CONSTRAINT `constrListMembershipUnitFK`
        FOREIGN KEY `user_fk` (`user`) REFERENCES `users` (`id`)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
	CONSTRAINT `constrListMembershipListFK`
        FOREIGN KEY `list_fk` (`list`) REFERENCES `lists` (`id`)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);