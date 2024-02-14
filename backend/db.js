"use strict";
/** Database setup for mode. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: `postgres://localhost:5432/${getDatabaseUri()}`
  });
}

db.connect();

module.exports = db;
