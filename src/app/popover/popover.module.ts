import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './component/popover.component';
import { PopoverDirective } from './component/popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { ArrowDirective } from './component/arrow.directive';
import { DataPointDirective } from './component/data-point.directive';



@NgModule({
  declarations: [PopoverComponent, PopoverDirective, ArrowDirective, DataPointDirective],
  imports: [CommonModule],
  exports:      [ PopoverDirective ,OverlayModule],
  entryComponents: [PopoverComponent]
})
export class PopoverModule { }
