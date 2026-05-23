CREATE TABLE `medications` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_name` text NOT NULL,
	`manufacturer` text NOT NULL,
	`active_ingredient` text,
	`effective` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pharmacy_credentials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`tga_id` text NOT NULL,
	`on_chain_status` text DEFAULT 'pending' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pharmacy_credentials_user_id_unique` ON `pharmacy_credentials` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `pharmacy_credentials_tga_id_unique` ON `pharmacy_credentials` (`tga_id`);--> statement-breakpoint
CREATE TABLE `prescriber_credentials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`ahpra_id` text NOT NULL,
	`ahpra_expiry` integer NOT NULL,
	`on_chain_status` text DEFAULT 'pending' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prescriber_credentials_user_id_unique` ON `prescriber_credentials` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `prescriber_credentials_ahpra_id_unique` ON `prescriber_credentials` (`ahpra_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user` integer,
	`expire` integer NOT NULL,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`address` text NOT NULL,
	`encrypted_key` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `wallets_user_id_unique` ON `wallets` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `wallets_address_unique` ON `wallets` (`address`);