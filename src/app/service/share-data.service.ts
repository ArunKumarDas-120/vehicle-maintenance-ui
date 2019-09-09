import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private subject = new Subject<any>();
    public behaviour = this.subject.asObservable();

    constructor() { }

    public publish(data: any) {
        this.subject.next({
            data
        });
    }
}