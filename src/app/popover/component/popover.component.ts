import { Component, ViewChild, TemplateRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DataPointDirective } from './data-point.directive';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  animations: [
    trigger('state', [
      state('initial, void, hidden', style({ transform: 'scale(0)' })),
      state('visible', style({ transform: 'scale(1)' })),
      transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ])
  ],
})
export class PopoverComponent implements AfterViewInit, OnDestroy {

  @ViewChild(DataPointDirective, { static: true })
  private insertionPoint: DataPointDirective;
  private template: TemplateRef<any>;

  constructor(template: TemplateRef<any>, private cd: ChangeDetectorRef) {
    this.template = template;
  }
  ngAfterViewInit(): void {
    this.insertionPoint.viewContainerRef.clear();
    this.insertionPoint.viewContainerRef.createEmbeddedView(this.template);
    this.cd.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.template)
      this.template = undefined;
  }
}
