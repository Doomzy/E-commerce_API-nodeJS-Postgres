CREATE DATABASE e_commerce_db
    WITH
    OWNER = postgres

CREATE TABLE products(
	id SERIAL PRIMARY KEY,
	title text UNIQUE NOT NULL,
	description VARCHAR NOT NULL,
	image text NOT NULL,
	inStock BOOLEAN default TRUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	price FLOAT
)

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	first_name text NOT NULL,
	last_name text NOT NULL,
	email text UNIQUE NOT NULL,
	password text NOT NULL,
	image text NOT NULL,
	isAdmin BOOLEAN default FALSE,
	joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE cart_items(
	id SERIAL PRIMARY KEY,
	uid integer not null,
	productid integer not null,
	quantity integer default 1,
	foreign key (uid) references users(id) ON DELETE CASCADE,
	foreign key (productid) references products(id) ON DELETE CASCADE
)

ALTER TABLE cart_items
  ADD UNIQUE ("uid","productid")


CREATE TABLE orders(
	id SERIAL PRIMARY KEY,
	uid integer UNIQUE not null,
	total_amount Float not null,
	address text not null,
	phone text not null,
	card_number text not null,
	status text default 'pending' not null,
	ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	foreign key (uid) references users(id) ON DELETE NO ACTION
)

CREATE TABLE order_items(
	id SERIAL PRIMARY KEY,
	orderid integer not null,
	productid integer  not null,
	quantity integer default 1,
	foreign key (orderid) references orders(id) ON DELETE CASCADE,
	foreign key (productid) references products(id) ON DELETE NO ACTION
)

ALTER TABLE order_items
  ADD UNIQUE ("orderid","productid")