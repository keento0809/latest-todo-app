CREATE TABLE "todo" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"isCompleted" boolean DEFAULT false NOT NULL
);
