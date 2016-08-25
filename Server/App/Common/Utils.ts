import * as express from "express";

var UnCapitalize = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
	if (/[A-Z]/.test(req.url)) {
		res.redirect(301, req.url.toLowerCase());
	} else {
		next();
	}
};

export { UnCapitalize };