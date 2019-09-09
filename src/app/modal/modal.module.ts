import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';


@NgModule({
  declarations: [ModalComponent, ModalDirective],
  imports: [CommonModule],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
