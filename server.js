const express = require("express");
const app = express();
const { Pool } = require("pg");

const connectionSTring = process.env.DATABASE_URL || "";