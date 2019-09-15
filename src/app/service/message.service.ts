import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();
  public observable = this.subject.asObservable();

  constructor() { }

  private show(header: string, messages: string | string[], messageType: 'info' | 'error'): void {
    messages = Array.isArray(messages) ? messages : [messages];
    this.subject.next({ show: true, header, messages, messageType });
  }

  public showMessage(header: string, messages: string | string[], messageType: 'info' | 'error') {
    this.show(header, messages, messageType);
  }
  
  public handleHttpError(error: any) {
    if (error.error instanceof ErrorEvent) {
      this.show('Connection error', 'Connection error', 'error');
    } else {
      switch (error.status) {
        case 0:
          this.show(error.status, 'Connection Error', 'error');
          break;
        case 400:
          this.show(error.status, error.error.errors, 'error');
          break;
      }
    }
  }
}
