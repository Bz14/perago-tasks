CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"parent_id" uuid
);
--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_parent_id_positions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."positions"("id") ON DELETE set null ON UPDATE no action;