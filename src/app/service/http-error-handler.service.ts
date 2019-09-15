import { Injectable } from '@angular/core';
import { ToastService } from '../components/toast/toast.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private toastService: ToastService,
    private messageService: MessageService) { }

  public handleSucess(){
    
  }
  public handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      this.toastService.show('Connection error', 'error');
    } else {
     
      switch (error.status) {
        case 0:
          this.toastService.show(error.status +' : Connection Error', 'error');
          break;
        case 400:
            this.toastService.show(error.status +' : ' + error.error.errors, 'error');
          break;
      }
    }
  }
}
