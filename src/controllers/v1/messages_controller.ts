/*
 * Messages controller.
 */

"use strict";

import { Response, Request, NextFunction } from "express";
import firebase, { database } from 'firebase';
import { Message } from "../../model/message";
import * as url from 'url';
import app from '../../app';

export let createMessageCommunity = (req: Request, res: Response, next: NextFunction) => {
	let msg = new Message();

	msg.issue = req.body.issue;
	msg.sender = req.body.sender;
	msg.body = req.body.body;
	msg.recipient = req.body.recipient;

	var ref = firebase.database().ref('messages/');
	const date = new Date();

	var fcm = app.get('fcm');
	const notification = {
		to: msg.recipient,

		data: {
			title: 'Meld Het!',
			body: msg.body,
			issue: msg.issue,
			sender: msg.sender
		}
	};

	fcm.send(notification, function(err : any, response : any) {
		if(err) {
			console.log('Unable to send notification:');
			console.log(err);
		} else {
			console.log('Notification sent!');
		}
	})

	ref.push({
		issue: msg.issue,
		sender: msg.sender,
		body: msg.body,
		recipient: msg.recipient,
		created_at: date.valueOf()
	});

	res.json({ok: true});
	next();
}

export let createMessage = (req: Request, res: Response, next: NextFunction) => {
	let msg = new Message();

	msg.issue = req.body.issue;
	msg.sender = req.body.sender;
	msg.body = req.body.body;
	msg.recipient = req.body.recipient;

	var ref = firebase.database().ref('messages/');
	const date = new Date();

	ref.push({
		issue: msg.issue,
		sender: msg.sender,
		body: msg.body,
		recipient: msg.recipient,
		created_at: date.valueOf()
	});

	res.json({ok: true});
	next();
};

export let getByIssue = (req: Request, res: Response, next: NextFunction) => {
	const parts = url.parse(req.url, true);
	var db = firebase.database().ref('messages');
	const issue = parts.query.issue as string;

	db.orderByChild("issue").equalTo(issue).once("value").then((snapshot) => {
		const obj = snapshot.val();
		var data = new Array<Message>();

		Object.keys(obj).forEach((k) => {
			var msg = obj[k] as Message;
			msg.id = k;
			data.push(msg);
		});

		data.sort(function (a: Message, b: Message) : number {
			const a_val = a.created_at as number;
			const b_val = b.created_at as number;
			return a_val - b_val;
		})

		res.json(data);
		next();
	}).catch((error) => {
		console.log(error);
		next();
	})
};
