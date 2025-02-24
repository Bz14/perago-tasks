ALTER TABLE "positions" DROP CONSTRAINT "positions_parent_id_positions_id_fk";
--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_parent_id_positions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."positions"("id") ON DELETE cascade ON UPDATE no action;