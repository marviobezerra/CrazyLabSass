import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { MdIconService } from "./ng-md-icon.service";

@Component({
	selector: "icone",	
	template: `
	<svg xmlns="http://www.w3.org/2000/svg" [attr.viewBox]="ViewBox" [attr.width]="Size" [attr.height]="Size" [style.fill]="Fill" #iconPath>
	</svg>`
})
export class MdMyIcon {
	constructor(private iconService: MdIconService) {
	}

	@ViewChild('iconPath') dataContainer: ElementRef;
	@Input('icon') set Icon(value: string) {
		var result = this.iconService.Shapes[value];
		this.dataContainer.nativeElement.innerHTML = result;	
	}
	
	@Input("size") Size: number = 44;
	@Input("fill") Fill: string = "red";

	ViewBox: string = "0 0 24 24";
}