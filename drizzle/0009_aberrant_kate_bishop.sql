ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `userType` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `verified` enum('yes','no') DEFAULT 'no' NOT NULL;