ALTER TABLE `eventSubmissions` ADD `updatedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `eventSubmissions` ADD `publishedAt` timestamp;