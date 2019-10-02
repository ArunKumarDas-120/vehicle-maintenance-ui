import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './component/popover.component';
import { PopoverDirective } from './component/popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { ArrowDirective } from './component/arrow.directive';



@NgModule({
  declarations: [PopoverComponent, PopoverDirective, ArrowDirective],
  imports: [CommonModule],
  exports:      [ PopoverDirective ,PopoverComponent,OverlayModule]
})
export class PopoverModule { }
