CREATE TABLE `article_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`sectionId` int NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `article_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageKey` varchar(50) NOT NULL,
	`sectionKey` varchar(50) NOT NULL,
	`sectionName` varchar(100) NOT NULL,
	`description` text,
	`displayOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_sections_id` PRIMARY KEY(`id`)
);
