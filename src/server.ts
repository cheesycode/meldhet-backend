/*
 * Application entry point.
 */

import errorHandler from "errorhandler";
import app from "./app";

/* Probably not the worlds brightest idea in production */
app.use(errorHandler());

const server = app.listen(app.get('port'), () => {
	console.log( "  App is running at http://localhost:%d", app.get('port'));
	console.log('   Press CTRL-C to stop');
});

export default server;
