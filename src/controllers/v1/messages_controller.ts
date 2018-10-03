/*
 * Messages controller.
 */

"use strict";

import { Response, Request, NextFunction } from "express";
import firebase, { database } from 'firebase';
import { Message } from "../../model/message";

export let createMessage = (req: Request, res: Response, next: NextFunction) => {
	let msg = new Message();

	msg.issue = req.body.issue;
	msg.sender = req.body.sender;
	msg.body = req.body.body;
	msg.recipient = req.body.recipient;

	var ref = firebase.database().ref('messages/');

	ref.push({
		issue: msg.issue,
		sender: msg.sender,
		body: msg.body,
		recipient: msg.recipient
	});

	//let db = firebase.database().ref('issues');
	/*db.orderByChild("tag").equalTo("Kapot").on("child_added", function(snapshot) {
		console.log(snapshot.key + ': ' + snapshot.val().lat);
	});*/

	res.json({ok: true});
	next();
};

export let getByIssue = (req: Request, res: Response, next: NextFunction) => {
	var db = firebase.database().ref('messages');
	db.orderByChild("issue").equalTo(req.body.issue).on("child_added", (snapshot) => {
		console.log(JSON.stringify(snapshot.val()));
	});

	res.json({ok: true});
	next();
};
