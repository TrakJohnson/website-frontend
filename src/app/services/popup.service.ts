import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    state$ = new BehaviorSubject<[boolean, string]>([false, ""]);
    loading$ = new BehaviorSubject<boolean>(false);

    constructor() {}

}          
                  