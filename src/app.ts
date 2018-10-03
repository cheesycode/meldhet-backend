/*
 * Application entry point.
 */

import express from "express";
import bodyParser from "body-parser";
import * as issues from "./controllers/v1/issues_controller";
import firebase from "firebase";
import * as messages from "./controllers/v1/messages_controller";

const app = express();


firebase.initializeApp({
	apiKey: "AIzaSyDLiJHuTvJfQafYNIajmanWpgZnAMiY_5Q",
	authDomain: "http://meldhet-fb52e.firebaseapp.com",
	databaseURL: "https://meldhet-fb52e.firebaseio.com",
	projectId: "meldhet-fb52e",
	storageBucket: "meldhet-fb52e.appspot.com",
	messagingSenderId: "492229451763"
});

app.set('port', 3500);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/v1/issues/get', issues.getByUserId);
app.post('/v1/issues/create', issues.createIssue);
app.post('/v1/messages/create', messages.createMessage);
app.post('/v1/messages/getall', messages.getByIssue);

export default app;
