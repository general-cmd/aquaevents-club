CREATE TABLE `blogPosts` (
	`id` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImage` text,
	`authorId` varchar(64) NOT NULL,
	`status` enum('draft','pending','published','archived') NOT NULL DEFAULT 'draft',
	`category` varchar(100),
	`tags` text,
	`publishedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `federations` (
	`id` varchar(64) NOT NULL,
	`name` text NOT NULL,
	`acronym` varchar(20),
	`description` text,
	`logo` text,
	`website` text,
	`email` varchar(320),
	`phone` varchar(50),
	`address` text,
	`region` varchar(100),
	`type` enum('national','regional','club') NOT NULL DEFAULT 'regional',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `federations_id` PRIMARY KEY(`id`)
);
