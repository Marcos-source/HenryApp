# bin /bash
source ./.env
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER  -c 'DROP DATABASE IF EXISTS henryapp'
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER  -c 'CREATE DATABASE henryapp'
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER henryapp < ./src/data/tables.sql