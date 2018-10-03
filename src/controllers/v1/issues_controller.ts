
"use strict";

import { Response, Request, NextFunction } from "express";
import firebase from 'firebase';

export let createIssue = (req: Request, res: Response, next: NextFunction) => {
	console.log('Latitude: ' +  req.body.lat);
	console.log('Longitude: ' + req.body.lon);
	console.log(req.body);

	firebase.database().ref('issues/' + req.body.id).set({
		lat: req.body.lat,
		lon: req.body.lon,
		acc: req.body.acc,
		image: req.body.image,
		tag: req.body.tag
	});

	res.json({ok: true})
	next();
};
