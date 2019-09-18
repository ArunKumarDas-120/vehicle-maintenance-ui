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
        case 401:
          this.show(error.status, 'Unautorized', 'error');
          break;
        case 403:
          this.show(error.status, 'Forbidden', 'error');
          break;
        case 404:
          this.show(error.status, 'Not Found', 'error');
          break;
        case 405:
          this.show(error.status, 'Method Not Allowed', 'error');
          break;
        case 408:
          this.show(error.status, 'Request Timeout', 'error');
          break;
        case 415:
          this.show(error.status, 'Unsupported Media Type', 'error');
          break;
        case 500:
          this.show(error.status, 'Internal Sever Error', 'error');
          break;
        case 502:
          this.show(error.status, 'Bad Gateway', 'error');
          break;
        case 503:
          this.show(error.status, 'Service Unavailable', 'error');
          break;
        default:
          this.show(error.status, 'System issue', 'error');
          break;
      }
    }
  }
}
