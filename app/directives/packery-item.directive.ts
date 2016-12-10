import {  Directive, Inject, ElementRef, forwardRef, OnDestroy, AfterViewInit } from "@angular/core";
import { PackeryComponent } from "../components/packery";
    
@Directive({
	selector: "[packery-item]"
})
export class PackeryItemDirective implements AfterViewInit, OnDestroy {
	constructor(private element: ElementRef, @Inject(forwardRef(() => PackeryComponent)) private root: PackeryComponent) { 

    }

    ngAfterViewInit() {
        this.root.add(this.element.nativeElement);
    }

    ngOnDestroy() {
        this.root.remove(this.element.nativeElement);
    }
}
