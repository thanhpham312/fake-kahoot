const db = require('../models/database')
db.executeQuery(
  `CREATE TABLE IF NOT EXISTS public."ACCOUNTS"
(
  "ACCOUNT_ID" serial NOT NULL UNIQUE,
  "USERNAME" character varying(50) NOT NULL,
  "PASSWORD" character varying(100) NOT NULL,
  CONSTRAINT "ACCOUNTS_pkey" PRIMARY KEY ("ACCOUNT_ID")
);`).catch(error => {
  return error
})

db.executeQuery(
  `CREATE TABLE IF NOT EXISTS public."SCORES"
(
  "SCORE_ID" serial NOT NULL UNIQUE,
  "ACCOUNT_ID" bigint NOT NULL,
  "SCORE" numeric NOT NULL,
  "HIGHEST_STREAK" smallint NOT NULL,
  "DATE" date NOT NULL,
  CONSTRAINT "SCORES_pkey" PRIMARY KEY ("SCORE_ID"),
  CONSTRAINT "SCORE_ACCOUNT" FOREIGN KEY ("ACCOUNT_ID")
      REFERENCES public."ACCOUNTS" ("ACCOUNT_ID") MATCH SIMPLE
      ON DELETE NO ACTION ON UPDATE NO ACTION
);`).catch(error => {
  return error
})

db.executeQuery(
  `CREATE TABLE IF NOT EXISTS public."QUESTIONS"
(
  "QUESTION_ID" serial NOT NULL UNIQUE,
  "QUESTION_CONTENT" character varying(1000),
  "RIGHT_ANSWER" character varying(1000),
  "WRONG_ANSWER1" character varying(1000),
  "WRONG_ANSWER2" character varying(1000),
  "WRONG_ANSWER3" character varying(1000),
  "ACCOUNT_ID" bigint NOT NULL,
  CONSTRAINT "QUESTIONS_pkey" PRIMARY KEY ("QUESTION_ID"),
  CONSTRAINT "FK_ACCOUNT_QUESTION" FOREIGN KEY ("ACCOUNT_ID")
      REFERENCES public."ACCOUNTS" ("ACCOUNT_ID") MATCH SIMPLE
      ON DELETE NO ACTION ON UPDATE NO ACTION
);
`).catch(error => {
  return error
})
