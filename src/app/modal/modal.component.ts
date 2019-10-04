import { Component, AfterViewInit, OnDestroy, Type, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ComponentRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalDirective } from './modal.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  @ViewChild(ModalDirective, { static: true })
  private insertionPoint: ModalDirective;
  private childComponent: Type<any>;
  private childComponentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const childComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponent);
    this.insertionPoint.viewContainerRef.clear();
    this.childComponentRef = this.insertionPoint.viewContainerRef.createComponent(childComponentFactory);
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.childComponentRef) {
      this.childComponentRef.destroy();
    }
  }

  public setChildComponent(childComponent: Type<any>): void {
    this.childComponent = childComponent;
  }
}
