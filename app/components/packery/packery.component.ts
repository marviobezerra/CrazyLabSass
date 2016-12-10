import { Component, OnInit, OnDestroy, Input, Output, ElementRef, EventEmitter } from "@angular/core";
var PackeryJs = require("packery");

@Component({
    selector: "packery",
    template: "<ng-content></ng-content>"
})
export class PackeryComponent implements OnInit, OnDestroy {

    constructor(private rootElement: ElementRef) {

    }

    public Packery: any;

    @Input() public init: (pack: PackeryComponent) => {};
    @Input() public options: any;

    @Output() layoutComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() removeComplete: EventEmitter<any[]> = new EventEmitter<any[]>();

    public ngOnInit(): void {
        if (!this.options) {
            this.options = {
                percentPosition: true,
                columnWidth: ".post"
            };
        }

        if (!this.options.itemSelector) {
            this.options.itemSelector = "[packery-item], packery-item";
        }

        this.rootElement.nativeElement.style.display = "block";

        this.Packery = new PackeryJs(this.rootElement.nativeElement, this.options);

        this.Packery.on("layoutComplete", (event: any, items: any) => {
            this.layoutComplete.emit(items);
        });
    }

    public ngOnDestroy() {
        if (this.Packery) {
            this.Packery.destroy();
        }
    }

    public layout(): void {

        setTimeout(() => {
            this.Packery.layout();
        });
    }

    public add(element: HTMLElement): void {

        var isFirstItem = this.Packery.items.length === 0;
        this.Packery.appended(element);

        if (isFirstItem)
            this.layout();

        console.log("Packery:", "Item added");
    }

    public remove(element: HTMLElement): void {
        this.Packery.remove(element);
        this.layout();

        console.log("Packery:", "Item removed");
    }
}