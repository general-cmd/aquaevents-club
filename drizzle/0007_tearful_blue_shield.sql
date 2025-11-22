ALTER TABLE `users` ADD `organizationName` text;--> statement-breakpoint
ALTER TABLE `users` ADD `organizationLogo` text;--> statement-breakpoint
ALTER TABLE `users` ADD `organizationWebsite` text;--> statement-breakpoint
ALTER TABLE `users` ADD `organizationPhone` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `organizationAddress` text;--> statement-breakpoint
ALTER TABLE `users` ADD `organizationLegalId` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `organizationDescription` text;--> statement-breakpoint
ALTER TABLE `users` ADD `verificationStatus` enum('pending','approved','rejected') DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `users` ADD `verificationNotes` text;--> statement-breakpoint
ALTER TABLE `users` ADD `verifiedAt` timestamp;