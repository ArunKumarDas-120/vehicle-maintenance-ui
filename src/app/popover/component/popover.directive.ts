import { Directive, OnDestroy, OnInit, Input, ElementRef, ViewContainerRef, Renderer2, TemplateRef, Injector } from '@angular/core';
import { OverlayRef, Overlay, OverlayConfig, ConnectedPositionStrategy } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { PopoverComponent } from './popover.component';
import { DataInjector } from './data-Injector';
export declare type PopoverDirection = "left" | "top" | "right" | "bottom";
export declare type PopoverTriggerScrollStrategy = "close" | "reposition";
@Directive({
  selector: '[appPopover]'
})
export class PopoverDirective implements OnDestroy, OnInit {

  private overlayRef: OverlayRef;
  private portal: ComponentPortal<any>;
  @Input("popOverDirection") popOverDirection: PopoverDirection = "right";
  @Input("popOverScrollStrategy") popOverScrollStrategy: PopoverTriggerScrollStrategy = "close";
  @Input("popOverOpenEventType") popOverOpenEventType: "click" | "mouseenter";
  @Input("popOverCloseEventType") popOverCloseEventType: "click" | "mouseout" | "anywhere";
  @Input("offsetX") positionX: number = 0;
  @Input("offsetY") positionY: number = 0;
  @Input("popOverContent") template: TemplateRef<any>;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private rendrer: Renderer2,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    if (this.popOverOpenEventType) {
      this.rendrer.listen(this.elementRef.nativeElement, this.popOverOpenEventType, (evt) => {
        this.openTooltip();
      });
    }

    if (this.popOverCloseEventType) {
      this.rendrer.listen(this.popOverCloseEventType === 'anywhere' ? 'document' : this.elementRef.nativeElement,
        this.popOverCloseEventType === 'anywhere' ? 'click' : this.popOverCloseEventType, (evt) => {
          this.closeTooltip();
        });
    }

  }

  ngOnDestroy(): void {
    this.closeTooltip();
    if (this.overlayRef)
      this.overlayRef = undefined;
    if (this.portal)
      this.portal = undefined;
    
  }

  private openTooltip(): void {
    if (!this.createOverlay().hasAttached()) {
      this.createOverlay().attach(this.portal);
    }
  }

  private closeTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private createOverlay(): OverlayRef {
    if (!this.overlayRef) {
      const map = new WeakMap();
      map.set(TemplateRef, this.template);
      this.portal =  new ComponentPortal(PopoverComponent,this.viewContainerRef,new DataInjector(this.injector,map));
      const overlayState = new OverlayConfig();
      overlayState.positionStrategy = this.getPosition();;

      if (this.popOverScrollStrategy === "reposition") {
        overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();
      } else {
        overlayState.scrollStrategy = this.overlay.scrollStrategies.close();
      }
      overlayState.scrollStrategy.enable();
      this.overlayRef = this.overlay.create(overlayState);
    }

    return this.overlayRef;
  }

  private getPosition(): ConnectedPositionStrategy {
    if (this.popOverDirection === "right") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "end", originY: "center" },
          { overlayX: "start", overlayY: "center" }
        )
        .withOffsetX(this.positionX)
        .withOffsetY(this.positionY);

      return this.withFallbackStrategy(strategy);
    } else if (this.popOverDirection === "bottom") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "center", originY: "bottom" },
          { overlayX: "center", overlayY: "top" }
        )
        .withOffsetX(this.positionX)
        .withOffsetY(this.positionY);
      return this.withFallbackStrategy(strategy);
    } else if (this.popOverDirection === "top") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "center", originY: "top" },
          { overlayX: "center", overlayY: "bottom" }
        )
        .withOffsetX(this.positionY)
        .withOffsetY(this.positionY);

      return this.withFallbackStrategy(strategy);
    } else if (this.popOverDirection === "left") {
      const strategy = this.overlay
        .position()
        .connectedTo(
          this.elementRef,
          { originX: "start", originY: "center" },
          { overlayX: "end", overlayY: "center" }
        )
        .withOffsetX(this.positionX)
        .withOffsetY(this.positionY);

      return this.withFallbackStrategy(strategy);
    }
  }
  private withFallbackStrategy(strategy: ConnectedPositionStrategy): ConnectedPositionStrategy {
    strategy.withFallbackPosition(
        { originX: "center", originY: "bottom" },
        { overlayX: "center", overlayY: "top" },
        0,
        1
      )
      .withFallbackPosition(
        { originX: "end", originY: "bottom" },
        { overlayX: "end", overlayY: "top" },
        0,
        1
      )
      .withFallbackPosition(
        { originX: "end", originY: "center" },
        { overlayX: "start", overlayY: "center" },
        1,
        0
      )
      .withFallbackPosition(
        { originX: "start", originY: "center" },
        { overlayX: "end", overlayY: "center" },
        -1,
        0
      )
      .withFallbackPosition(
        { originX: "center", originY: "top" },
        { overlayX: "center", overlayY: "bottom" },
        0,
        -1
      )
      .withFallbackPosition(
        { originX: "start", originY: "bottom" },
        { overlayX: "start", overlayY: "top" },
        0,
        1
      )
      .withFallbackPosition(
        { originX: "start", originY: "top" },
        { overlayX: "start", overlayY: "bottom" },
        0,
        -1
      )
      .withFallbackPosition(
        { originX: "end", originY: "top" },
        { overlayX: "end", overlayY: "bottom" },
        0,
        -1
      );
    return strategy;
  }
}
