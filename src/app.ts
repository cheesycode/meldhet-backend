/*
 * Application entry point.
 */

import express from "express";
import bodyParser from "body-parser";
import * as issues from "./controllers/v1/issues_controller";
import firebase from "firebase";
import * as messages from "./controllers/v1/messages_controller";
const FCM = require('fcm-node');

const app = express();
const fcm = new FCM('AAAAcpspX_M:APA91bHUltg0FCdEgCbnjUWhXFSY5MTVwQifknJtfKOgHG5A53BVBOU7WxwCtlwCkvM4h-0_WMpN2Qen_LwEo0kwX3rlYlFa23QNtxN919Td-Wu4wl-6eyiArrA3XuSOFOJicEJlrJet');

firebase.initializeApp({
	apiKey: "AIzaSyDLiJHuTvJfQafYNIajmanWpgZnAMiY_5Q",
	authDomain: "http://meldhet-fb52e.firebaseapp.com",
	databaseURL: "https://meldhet-fb52e.firebaseio.com",
	projectId: "meldhet-fb52e",
	storageBucket: "meldhet-fb52e.appspot.com",
	messagingSenderId: "492229451763"
});

app.set('fcm', fcm);
app.set('port', 3500);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/v1/issues/get', issues.getByUserId);
app.post('/v1/issues/create', issues.createIssue);

app.post('/v1/messages/create', messages.createMessage);
app.post('/v1/messages/create_community', messages.createMessageCommunity)
app.get('/v1/messages/getall', messages.getByIssue);

export default app;
