import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDataPoint]'
})
export class DataPointDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
