CREATE TABLE `article_tags` (
	`articleId` int NOT NULL,
	`tagId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`slug` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `articles` ADD `scheduledPublishAt` timestamp;--> statement-breakpoint
ALTER TABLE `articles` ADD `metaDescription` varchar(160);--> statement-breakpoint
ALTER TABLE `articles` ADD `metaKeywords` varchar(255);--> statement-breakpoint
ALTER TABLE `articles` ADD `ogImage` varchar(500);