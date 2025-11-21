ALTER TABLE `eventSubmissions` ADD `registrationUrl` text;--> statement-breakpoint
ALTER TABLE `eventSubmissions` ADD `maxCapacity` varchar(20);--> statement-breakpoint
ALTER TABLE `eventSubmissions` ADD `currentRegistrations` varchar(20) DEFAULT '0';