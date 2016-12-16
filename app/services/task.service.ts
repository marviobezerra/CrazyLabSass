import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

export enum TaskState {
	Running = 1,
	Complete = 2,
	Canceled = 3,
	Watting = 4
}

export interface ITaskEntity {
	Id: string;
	Name: string;
	State: TaskState,
	StateText: string,
	CanChange: boolean,
	Notes?: string
}

interface Map<T> {
	[K: string]: T;
}

@Injectable()
export class TaskService {
	constructor() {
		this.BusyObservable = new Subject<boolean>();
	}

	private Count: number = 0;

	private Tasks: Map<ITaskEntity> = {};
	private _Busy: boolean = false;

	public get Busy(): boolean {
		return this._Busy;
	};

	public BusyObservable: Subject<boolean>;

	public Clear(): void {
		this.Tasks = {};
		this.CheckState();
	}

	public StartTask(id: string): void {
		this.SetState(id, TaskState.Running);
	}

	public CompleteTask(id: string, remove: boolean = true): void {
		this.SetState(id, TaskState.Complete);

		if (remove) {
			delete (this.Tasks[id]);
		}
	}

	public CancelTask(id: string, remove: boolean = true, reason: string = ""): void {
		this.SetState(id, TaskState.Canceled, reason);
		if (remove) {
			delete (this.Tasks[id]);
		}
	}

	public Report(state?: TaskState): Array<ITaskEntity> {
		let result: Array<ITaskEntity> = [];

		for (let id in this.Tasks) {

			if (!state || this.Tasks[id].State == state) {
				result.push(this.Tasks[id]);
			}
		}

		return result;
	}

	public CreateTask(name: string, start: boolean = true): string {

		this.Count++;

		let task: ITaskEntity = {
			Id: this.Count.toString(),
			Name: name,
			State: TaskState.Watting,
			CanChange: true,
			StateText: TaskState[TaskState.Watting];
		};

		this.Tasks[task.Id] = task;

		if (start) {
			this.SetState(task.Id, TaskState.Running);
		}

		return task.Id;
	}

	private SetState(id: string, state: TaskState, reason: string = ""): void {
		let task = this.Tasks[id];

		if (!task) {
			return;
		}

		task.State = state;
		task.StateText = TaskState[task.State];
		task.CanChange = task.State === TaskState.Watting || task.State === TaskState.Running;
		task.Notes = reason;

		this.CheckState();
	}

	private CheckState(): void {

		let taskRunning: boolean = false;

		for (let id in this.Tasks) {
			if (this.Tasks[id].State === TaskState.Running) {
				taskRunning = true;
				break;
			}
		}

		if (taskRunning && !this._Busy) {
			this._Busy = true;
			this.BusyObservable.next(true);
		}

		if (!taskRunning && this._Busy) {
			this._Busy = false;
			this.BusyObservable.next(false);
		}
	}
}