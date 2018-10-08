
"use strict";

import { Response, Request, NextFunction } from "express";
import firebase from 'firebase';
import * as url from 'url';

function mapToJson(map : Map<string, any>) {
    return JSON.stringify([...map]);
}
function jsonToMap(jsonStr : string) {
    return new Map(JSON.parse(jsonStr));
}

export let createIssue = (req: Request, res: Response, next: NextFunction) => {
	console.log('Latitude: ' +  req.body.lat);
	console.log('Longitude: ' + req.body.lon);
	console.log(req.body);

	/* TODO: generate issue ID */
	var db = firebase.database().ref('issues/');
	db.push({
		lat: req.body.lat,
		lon: req.body.lon,
		acc: req.body.acc,
		image: req.body.image,
		tag: req.body.tag,
		creator: req.body.id,
		status: 'open'
	});

	res.json({ok: true})
	next();
};

export let getByUserId = (req: Request, res: Response, next: NextFunction) => {
	var parts = url.parse(req.url, true);
	var db = firebase.database().ref('issues/');
	const id = parts.query.id as string;

	db.orderByChild("creator").equalTo(id).once("value").then(function (result) {
		const obj = result.val();
		var data : Array<any> = new Array<any>();

		Object.keys(obj).forEach(function(k) {
			var value = obj[k];
			value.id = k;
			if(value.status != 'closed')
				data.push(value);
		});

		res.json(data);
		next();
	}).catch((reason) => {
		console.log(reason);
		next();
	});
};
