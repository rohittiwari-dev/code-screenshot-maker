CREATE TABLE "sharable_link_data_table" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"title" varchar(50) NOT NULL,
	"theme" varchar(50) NOT NULL,
	"dark_mode" boolean DEFAULT true,
	"show_background" boolean DEFAULT true,
	"language" varchar(50) NOT NULL,
	"auto_detect_language" boolean DEFAULT false,
	"font_size" integer NOT NULL,
	"font_style" varchar(50) NOT NULL,
	"padding" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
