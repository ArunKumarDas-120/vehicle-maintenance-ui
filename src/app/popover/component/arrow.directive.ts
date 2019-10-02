import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appArrow]'
})
export class ArrowDirective {

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  arrowSize: number;

  @HostBinding('style.top.px')
  offsetTop: number;

  @HostBinding('style.right.px')
  offsetRight: number;

  @HostBinding('style.bottom.px')
  offsetBottom: number;

  @HostBinding('style.left.px')
  offsetLeft: number;

  constructor() {
    console.log(this.offsetBottom);
  }

}
