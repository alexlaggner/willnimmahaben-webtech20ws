Datenbank (in Postgres) : 

CREATE DATABASE willnimmahabendb;

CREATE TABLE products(
id BIGSERIAL PRIMARY_KEY,
fotourl VARCHAR(200) NOT NULL,
name VARCHAR(100) NOT NULL,
beschreibung VARCHAR(3000) NOT NULL,
kontakt VARCHAR(200),
auto BIT(1),
elektronik BIT(1),
haushalt BIT(1),
andere BIT(1)
);

CREATE TABLE users(
id VARCHAR(50) NOT NULL,
username VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
tel VARCHAR(20) NOT NULL
);

Server:
läuft auf localhost:3000,
kann im Verzeichnis 'server' mittels "npm start" gestartet werden.
Wichtig: in routes_products, sowie routes_users muss die funktion
'initDb()' mit den richtigen logindaten aktualisiert werden.

Client: mit ng serve --open im angular-client Ordner öffnen