ALTER TABLE "admin" RENAME COLUMN "userName" TO "username";--> statement-breakpoint
ALTER TABLE "admin" DROP CONSTRAINT "admin_userName_unique";--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_username_unique" UNIQUE("username");