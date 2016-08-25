import { IRouter } from "express";


export interface IRoute {
	SetUp(router: IRouter, baseAddress: string): void;
}