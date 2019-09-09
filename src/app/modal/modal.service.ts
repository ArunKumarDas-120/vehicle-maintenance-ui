import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, Type, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { ModalModule } from './modal.module';
import { ModalComponent } from './modal.component';
import { ModalData } from './modal-data';
import { ModalInjector } from './modal-injector';

@Injectable({
  providedIn: ModalModule
})
export class ModalService {

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactory: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef) { }

  public openModal(component: Type<any>,config: ModalData): void {
    const modalComponentFactory = this.componentFactory.resolveComponentFactory(ModalComponent);
    const map = new WeakMap();
    map.set(ModalData, config);
    this.modalComponentRef = modalComponentFactory.create(new ModalInjector(this.injector,map));
    this.appRef.attachView(this.modalComponentRef.hostView);
    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.modalComponentRef.instance.setChildComponent(component);
  }
  public closeModal(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
    }
  }
}
