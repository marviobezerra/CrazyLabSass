import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


@Injectable()
export class SimpleService {
	constructor() {
		this.BusyObservable = new Subject<boolean>();
	}

	private _Busy: boolean = true;

	private busyTrigger(value: boolean): void {
	}

	public get Busy(): boolean {
		return this._Busy;
	}
	public set Busy(value: boolean) {
		if (value === this._Busy){
			return;
		}

		this._Busy = value;
		this.BusyObservable.next(value);
	}

	public BusyObservable: Subject<boolean>;
}