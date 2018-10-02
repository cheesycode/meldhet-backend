
"use strict";

import { Response, Request, NextFunction } from "express";
import { Issue } from "../../model/issue";
import app from '../../app';
import firebase from 'firebase';

export let createIssue = (req: Request, res: Response, next: NextFunction) => {
	console.log('Latitude: ' +  req.body.lat);
	console.log('Longitude: ' + req.body.lon);
	console.log(req.body);

	const obj = {
		lat: req.body.lat,
		lon: req.body.lon,
		acc: req.body.acc,
		image: req.body.acc,
		tag: req.body.tag
	}

	firebase.database().ref('issues/' + req.body.id).set({
		obj
	});

	res.json({ok: true})
	next();
};
