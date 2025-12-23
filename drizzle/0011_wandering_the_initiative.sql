CREATE TABLE `capPricing` (
	`id` varchar(64) NOT NULL,
	`capType` varchar(50) NOT NULL,
	`colorCount` int NOT NULL,
	`minQuantity` int NOT NULL,
	`maxQuantity` int,
	`pricePerUnit` decimal(10,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EUR',
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `capPricing_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `capTestimonials` (
	`id` varchar(64) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`clubName` varchar(255) NOT NULL,
	`quote` text NOT NULL,
	`photo` text,
	`capType` varchar(50),
	`rating` int DEFAULT 5,
	`featured` boolean NOT NULL DEFAULT false,
	`active` boolean NOT NULL DEFAULT true,
	`displayOrder` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `capTestimonials_id` PRIMARY KEY(`id`)
);
