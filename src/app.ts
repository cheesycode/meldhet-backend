/*
 * Application entry point.
 */

import express from "express";
import bodyParser from "body-parser"

const app = express();

app.set('port', 80);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
