
"use strict";

import { Response, Request, NextFunction } from "express";
import { Issue } from "../../model/issue";
import app from '../../app';
import firebase from 'firebase';

export let createNotification = (req: Request, res: Response, next: NextFunction) => {
	console.log('Latitude: ' +  req.body.lat);
	console.log('Longitude: ' + req.body.lon);
	console.log(req.body);

	let obj = new Issue();

	obj.image = req.body.image;
	obj.lat = req.body.lat;
	obj.lon = req.body.lon;
	obj.tag = req.body.tag;

	firebase.database().ref('issues/' + req.body.id).set({
		lon: 13.661,
		lat: 64.12341,
		image: "Image-id-2351la-blablal",
		tag: "kapot"
	});

	res.json({ok: true})
	next();
};
