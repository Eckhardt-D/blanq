CREATE TABLE `purchases` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_price_id` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `purchases_created_idx` ON `purchases` (`created_at`);--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_subscription_id` text NOT NULL,
	`stripe_main_plan_id` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`current_period_end` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_stripe_subscription_id_unique` ON `subscriptions` (`stripe_subscription_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_user_id_idx` ON `subscriptions` (`user_id`,`stripe_subscription_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_created_idx` ON `subscriptions` (`created_at`);--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_customer_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_customer_id_unique` ON `users` (`stripe_customer_id`);--> statement-breakpoint
CREATE INDEX `users_stripe_id_idx` ON `users` (`stripe_customer_id`);