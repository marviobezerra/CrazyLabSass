import { IRouter, Request, Response } from "express";

import { IRoute } from "./";
import { PeopleService, } from "../Services";
import { IPerson } from "../../../Entity";

export class PeopleRoute implements IRoute {

    constructor() {
        this.peopleService = new PeopleService();
    }

    private peopleService: PeopleService

    private Index(req: Request, res: Response): void {

        this.peopleService.GetPeople(req.query.count || 50)
            .map((value: IPerson[], index: number) => value)
            .subscribe((result: IPerson[]) => res.json(result));
    }

    private Company(req: Request, res: Response): void {

        this.peopleService.GetPerson()
            .map((value: IPerson, index: number) => value)
            .subscribe((result: IPerson) => res.json(result));
    }

    public SetUp(router: IRouter, baseAddress: string): void {
        router.get(baseAddress + "people/", (req: Request, res: Response) => this.Index(req, res));
        router.get(baseAddress + "people/company", (req: Request, res: Response) => this.Company(req, res));
    }
}