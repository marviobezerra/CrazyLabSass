import { Component, Input } from "@angular/core";
import { MdIconService } from "./ng-md-icon.service";

@Component({
	selector: "icone",
	template: `
	<svg xmlns="http://www.w3.org/2000/svg" attr.viewBox="{{ViewBox}}" attr.width="{{Size}}" attr.height="{{Size}}" [attr.value]="IconPath">
		
	</svg>`
})
export class MdMyIcon {
	constructor(private iconService: MdIconService) {
	}
	
	get IconPath(): string {
		var result = this.iconService.Shapes[this.Icon];
		return result;
	}

	@Input('icon') Icon : string = "help";
	@Input("size") Size: number = 24;

	ViewBox: string = "0 0 24 24";
}