import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  constructor(
    private decoratedElement: ElementRef,
    private renderer: Renderer2
  ) {}
  @HostListener("click") function() {
    const element = this.decoratedElement.nativeElement;
    if (Array.from(element.classList).includes("open"))
      this.renderer.removeClass(element, "open");
    else this.renderer.addClass(element, "open");
  }
}
