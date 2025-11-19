CREATE TABLE `eventSubmissions` (
	`id` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`discipline` varchar(100) NOT NULL,
	`category` varchar(100),
	`region` varchar(100) NOT NULL,
	`city` varchar(100) NOT NULL,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp,
	`contactName` varchar(255),
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(50),
	`website` text,
	`description` text,
	`submittedBy` varchar(64),
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`adminNotes` text,
	`createdAt` timestamp DEFAULT (now()),
	`reviewedAt` timestamp,
	`reviewedBy` varchar(64),
	CONSTRAINT `eventSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userFavorites` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`eventId` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `userFavorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `userType` enum('club','swimmer','federation','other');--> statement-breakpoint
ALTER TABLE `users` ADD `preferredDisciplines` text;--> statement-breakpoint
ALTER TABLE `users` ADD `emailConsent` timestamp;