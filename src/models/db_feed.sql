--CREATE DATABASE todo_database;

CREATE TABLE adventurer(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE adventures(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INT NOT NULL
);

CREATE TABLE cart(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES adventurer(id),
  adventure_id INT NOT NULL REFERENCES adventures(id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

--populat

INSERT INTO adventures (name, description, price) VALUES ('Lost City of X','Embark on a breathtaking journey to find the lost city of X. Solve your way through its labyrinthic gates to discover the ancient civilisation within.f',400000);

INSERT INTO adventures (name, description, price) VALUES ('Forgotten Temple','Track through deep snow and freezing landscapes to unearth a forgotten temple deep in the mountains. Wonders await for those who can uncover its secrets.s',700000);

INSERT INTO adventures (name, description, price) VALUES ('Treasure Hunt','Race against time and foe to unveil hidden clues scattered around the world in a search to discover the greatest pirate treasure of all time.',800000);

INSERT INTO adventures (name, description, price) VALUES ('Jurassic Isles',' Lost in a lush and treacherous rain forest, with limited supplies, you must fight to reach your only hope of escape - the last helipad.',900000);