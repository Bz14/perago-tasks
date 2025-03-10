ALTER TABLE "admin" RENAME COLUMN "username" TO "email";--> statement-breakpoint
ALTER TABLE "admin" DROP CONSTRAINT "admin_username_unique";--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_email_unique" UNIQUE("email");