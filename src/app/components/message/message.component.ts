import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('toastAnimation', [
      state('in', style({ opacity: 1, bottom: '30px' })),
      transition(':enter', [
        style({ opacity: 0, bottom: '0px' }),
        animate('600ms ease-in')
      ]),
      transition(':leave',
        animate('600ms ease-out', style({ opacity: 0 })))
    ])
  ]
})
export class MessageComponent implements OnInit, OnDestroy {

  header: string;
  messages: string[];
  messageType: string;
  show: boolean = false;
  private subscription: Subscription;
  @Input('hideTimeout') hideTimeout: number = 1000;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.observable.subscribe((data) => {
      this.show = data.show;
      this.header = data.header
      this.messages = data.messages;
      this.messageType = data.messageType;
      setTimeout(() => { this.show = false; }, this.hideTimeout);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
