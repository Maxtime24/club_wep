CREATE TABLE "outputs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(256) NOT NULL,
	"tags" text NOT NULL,
	"link" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "outputs_slug_unique" UNIQUE("slug")
);
