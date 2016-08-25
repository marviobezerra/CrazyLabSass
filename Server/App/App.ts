import * as express from "express";
import * as path from "path";
import { UnCapitalize } from "./Common";

import { PeopleRoute, IRoute } from "./Routes";

export class App {

    public App: express.Application;
    public Routes: IRoute[] = [];

    constructor() {
        this.App = express();
        this.ConfigApp();
        this.ConfigRoutes();
    }

    private ConfigApp(): void {
        //this.App.use(UnCapitalize);
        this.App.use(express.static(process.env.NODE_PATH + "/public"));
    }

    private ConfigRoutes(): void {
        let router: express.IRouter = express.Router();
        let apiAdress = "/api/v1/";

        router.get("/", this.index);

        this.Routes.push(new PeopleRoute());

        this.Routes.forEach(route => route.SetUp(router, apiAdress));

        this.App.use(router);
        this.App.use(this.index);
    }

    private index(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.sendFile(path.resolve(process.env.NODE_PATH + '/public/index.html'));
    }
}