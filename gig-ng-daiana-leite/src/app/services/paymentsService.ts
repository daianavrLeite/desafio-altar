
import { Injectable } from '@angular/core'
import { Payments } from '../models/payments';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class PaymentsService { 

    payment="";
    ammount="";
    private apiUrlKpi: String = 'http://127.0.0.1:8080/kpiManager/api/';
    public itens: Payments[] = [];
    constructor(
        private http: HttpClient
      ) { }

    public addPayment(name:string, ammount:number, code:string, grid:string[]) {
        let itemPayment: Payments = new Payments(
            name,ammount,code,grid
        )
        this.itens.push(itemPayment);
        console.log(itemPayment)
    }

    public getPayments(){
        return this.itens;
    }

createPayments(payments) {
    return this.http.post(this.apiUrlKpi + '', payments);
  }
}