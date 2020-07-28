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


--populat

INSERT INTO adventures (name, description, price) VALUES ('Lost City','Discover a lost city and if you can bring back proof',400);

INSERT INTO adventures (name, description, price) VALUES ('Forgotten Mountain Template','Track through a forgotten temple deep in the snowy mountains. If you can uncover its secrects',700);

INSERT INTO adventures (name, description, price) VALUES ('Pirate Treasure Hunt','Race against time and foes to unearth clues in a search to discover a great pirate treasure.',800);

INSERT INTO adventures (name, description, price) VALUES ('Jurassic Isles','Survive through deep jungles and treacherous islands to make your way to the last helipad. Beware the isles have teeth.',900);