CREATE TABLE `newsletterSubscribers` (
	`id` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`userType` enum('club','swimmer','federation','other'),
	`source` varchar(100) DEFAULT 'website',
	`systemeioSynced` boolean NOT NULL DEFAULT false,
	`systemeioContactId` varchar(100),
	`systemeioError` text,
	`subscribedAt` timestamp DEFAULT (now()),
	`unsubscribedAt` timestamp,
	CONSTRAINT `newsletterSubscribers_id` PRIMARY KEY(`id`)
);
