import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastAnimation', [
      state('in', style({opacity: 1,bottom: '30px'})),
      transition(':enter', [
        style({opacity: 0,bottom: '0px'}),
        animate('600ms ease-in')
      ]),
      transition(':leave',
        animate('600ms ease-out', style({opacity: 0})))
    ])
  ]
})
export class ToastComponent implements OnInit,  OnDestroy {
   private show: boolean = false;
   private message: string ;
   private messageType: string ;
   private snackbarSubscription: Subscription;
   @Input('hideTimeout') hideTimeout: number=1000;
  constructor(private toastService: ToastService) { }

  ngOnInit() {
   this.snackbarSubscription = this.toastService.snackbarState.subscribe((data)=>{
      this.show = data.show;
      this.message = data.message;
      this.messageType = data.type;
      setTimeout(() => {
        this.show = false;
      }, this.hideTimeout
      );
    });
  }

  ngOnDestroy(): void {
    this.snackbarSubscription.unsubscribe();
  }
}
