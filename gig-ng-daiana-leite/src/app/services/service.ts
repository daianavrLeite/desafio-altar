import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  private codeServiceBehaviorSubject = new BehaviorSubject<string>(``);
  private matrizServiceBehaviorSubject = new BehaviorSubject<string[]>([]);
  constructor() { }

  changeCode(value: string) {
    this.codeServiceBehaviorSubject.next(value);
  }
  matriz(value: string[]) {
    this.matrizServiceBehaviorSubject.next(value);
  }
  getCode() {
    return this.codeServiceBehaviorSubject;
  }
  getMatriz() {
    return this.matrizServiceBehaviorSubject;
  }



  

}