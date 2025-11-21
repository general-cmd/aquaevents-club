CREATE TABLE `eventReminders` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`eventId` varchar(255) NOT NULL,
	`eventTitle` text NOT NULL,
	`eventDate` timestamp NOT NULL,
	`reminderType` enum('1_week','3_days','1_day','same_day') NOT NULL,
	`reminderDate` timestamp NOT NULL,
	`sent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `eventReminders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','federation') NOT NULL DEFAULT 'user';