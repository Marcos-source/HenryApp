ALTER SYSTEM SET datestyle to "DMY";
CREATE TYPE "student_status" AS ENUM (
  'regular',
  'migracion',
  'baja',
  'egresado'
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(50) UNIQUE NOT NULL,
  "password" varchar(50) NOT NULL,
  "access_level" integer NOT NULL DEFAULT '0',
  "created_at" timestamp DEFAULT (now()),
  "salt" varchar(100) NOT NULL
);

CREATE TABLE "alumnos" (
  "id" SERIAL PRIMARY KEY,
  "userId" int UNIQUE NOT NULL,
  "apellido" varchar(60) NOT NULL,
  "nombre" varchar(60) NOT NULL,
  "dni" integer UNIQUE NOT NULL,
  "fecha_nac" date NOT NULL,
  "nacionalidad" varchar(110),
  "telefono" varchar(110),
  "direccion" varchar(110),
  "created_at" timestamp DEFAULT (now()),
  "contrato" boolean DEFAULT false,
  "cohorteId" int NOT NULL,
  "status" student_status DEFAULT 'regular'
);

CREATE TABLE "externalaccounts" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar(50),
  "provider" varchar(50),
  "token" varchar(50),
  "alumnoId" int UNIQUE NOT NULL
);

CREATE TABLE "instructores" (
  "id" SERIAL PRIMARY KEY,
  "userId" int UNIQUE NOT NULL,
  "apellido" varchar(60) NOT NULL,
  "nombre" varchar(60) NOT NULL,
  "dni" integer UNIQUE NOT NULL,
  "fecha_nac" date NOT NULL,
  "nacionalidad" varchar(110),
  "telefono" varchar(110),
  "direccion" varchar(110),
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "cohortes" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL,
  "inicio" date NOT NULL
);

CREATE TABLE "grupos" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar(50),
  "rating" integer
);

CREATE TABLE "pmxalumnos" (
  "id" SERIAL PRIMARY KEY,
  "alumnoId" int UNIQUE NOT NULL,
  "pmID" int UNIQUE NOT NULL,
  "cohorte" integer UNIQUE NOT NULL
);

CREATE TABLE "pairprogramming" (
  "id" SERIAL PRIMARY KEY,
  "alumnoId" int UNIQUE NOT NULL,
  "grupoId" int UNIQUE NOT NULL
);

CREATE TABLE "reviews" (
  "id" SERIAL PRIMARY KEY,
  "tech" int,
  "soft" int,
  "social" int,
  "rating" int,
  "notas" text
);

CREATE TABLE "reviewsxalumnos" (
  "id" SERIAL PRIMARY KEY,
  "validado" int UNIQUE NOT NULL,
  "validador" int UNIQUE NOT NULL,
  "review" int NOT NULL
);

CREATE TABLE "modulos" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "description" varchar(50) NOT NULL,
  "idCursos" int NOT NULL
);

CREATE TABLE "clases" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "idModulo" int NOT NULL
);

CREATE TABLE "quizz" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "description" varchar(300) NOT NULL,
  "idClase" int NOT NULL
);

CREATE TABLE "preguntas" (
  "id" SERIAL PRIMARY KEY,
  "pregunta" varchar(300) NOT NULL
);

CREATE TABLE "respuestas" (
  "id" SERIAL PRIMARY KEY,
  "response" varchar(140) NOT NULL,
  "respuestaCorrecta" boolean not null,
  "idPregunta" int NOT NULL
);

CREATE TABLE "quizzxpreguntas" (
  "id" SERIAL PRIMARY KEY,
  "idPregunta" int UNIQUE NOT NULL,
  "idQuizz" int NOT NULL
);

CREATE TABLE "cursos" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "description" varchar(180) NOT NULL,
  "idCohorte" int UNIQUE NOT NULL
);

ALTER TABLE "pmxalumnos" ADD FOREIGN KEY ("alumnoId") REFERENCES "alumnos" ("id");

ALTER TABLE "pmxalumnos" ADD FOREIGN KEY ("pmID") REFERENCES "instructores" ("id");

ALTER TABLE "pairprogramming" ADD FOREIGN KEY ("grupoId") REFERENCES "grupos" ("id");

ALTER TABLE "pairprogramming" ADD FOREIGN KEY ("alumnoId") REFERENCES "alumnos" ("id");

ALTER TABLE "reviewsxalumnos" ADD FOREIGN KEY ("validado") REFERENCES "alumnos" ("id");

ALTER TABLE "reviewsxalumnos" ADD FOREIGN KEY ("validador") REFERENCES "alumnos" ("id");

ALTER TABLE "reviewsxalumnos" ADD FOREIGN KEY ("review") REFERENCES "reviews" ("id");

ALTER TABLE "externalaccounts" ADD FOREIGN KEY ("alumnoId") REFERENCES "alumnos" ("id");

ALTER TABLE "alumnos" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "pmxalumnos" ADD FOREIGN KEY ("cohorte") REFERENCES "cohortes" ("id");

ALTER TABLE "cursos" ADD FOREIGN KEY ("idCohorte") REFERENCES "cohortes" ("id");

ALTER TABLE "respuestas" ADD FOREIGN KEY ("idPregunta") REFERENCES "preguntas" ("id");

ALTER TABLE "modulos" ADD FOREIGN KEY ("idCursos") REFERENCES "cursos" ("id");

ALTER TABLE "clases" ADD FOREIGN KEY ("idModulo") REFERENCES "modulos" ("id");

ALTER TABLE "quizz" ADD FOREIGN KEY ("idClase") REFERENCES "clases" ("id");

ALTER TABLE "quizzxpreguntas" ADD FOREIGN KEY ("idPregunta") REFERENCES "preguntas" ("id");

ALTER TABLE "quizzxpreguntas" ADD FOREIGN KEY ("idQuizz") REFERENCES "quizz" ("id");

ALTER TABLE "alumnos" ADD FOREIGN KEY ("cohorteId") REFERENCES "cohortes" ("id");

COMMENT ON COLUMN "users"."email" IS 'to include unit number';
