import { Directive, ElementRef, Input, HostListener } from "@angular/core";

@Directive({
	selector: "[detail]"
})
export class DetailDirective {
	constructor(private element: ElementRef) {
		this.Source = element;
	}

	public Source: ElementRef;
	@Input("detail-target") Target: (position: IPosition) => void;

	@HostListener("click") mouseEnter() {
		if (!this.Source || !this.Target)
			return;

		let sourceRect = this.GetRect(this.Source.nativeElement.getBoundingClientRect());
		this.Target(sourceRect);
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