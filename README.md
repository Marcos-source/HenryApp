# Henry App

## Archivo .env

En este archivo (que no se sube al repo) vamos a guardar las configuraciones de conexión a la DB y demás Passwords y API keys que no queremos compartir.
En la carpeta `./api` crear un archivo `.env.` que contenga lo siguiente:

```
DB_USER=tuUser
DB_PASSWORD=tuPassword
DB_HOST=localhost
```

Completar con los datos correspondientes a tu conexión.

## Base de Datos

El archivo `/src/data/tables.sh` es un script que genera la Base de Datos. Podemos ejecutarlos haciendo:

`npm run tables`


Probablemente te pida que le pongas permisos de ejecución:

`chmod +x ./src/data/tables.sh`

Deberías ver un output similar a este:

```
> ./src/data/tables.sh

DROP DATABASE
CREATE DATABASE
ALTER SYSTEM
CREATE TYPE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
COMMENT
```

la base `henryapp` debería estar creada.