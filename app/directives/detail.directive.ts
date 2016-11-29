import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({
	selector: "[detail]"
})
export class DetailDirective {
	constructor(private element: ElementRef) {
		this.Source = element;
	}

	public Source: ElementRef;
	@Input("detail-reference") Reference: any;
	@Input("detail-target") Target: (reference: any, position: IPosition) => void;

	@HostListener("click") click() {
		if (!this.Source || !this.Target)
			return;

		let sourceRect = this.GetRect(this.Source.nativeElement.getBoundingClientRect());
		this.Target(this.Reference, sourceRect);
	}

	private GetRect(sourceRect: ClientRect): IPosition {
		return {
			Bottom: sourceRect.bottom,
			Height: sourceRect.height,
			Left: sourceRect.left,
			Right: sourceRect.right,
			Top: sourceRect.top,
			Width: sourceRect.width
		};
	}
}

export interface IPosition {
	Bottom: number;
	Height: number;
	Left: number;
	Right: number;
	Top: number;
	Width: number;
}