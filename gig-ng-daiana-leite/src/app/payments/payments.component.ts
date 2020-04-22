import { Component, OnInit, Input } from '@angular/core';
import { PaymentsService } from '../services/paymentsService';
import { Payments } from '../models/payments';

import { Subscription } from 'rxjs';
import { AppService } from '../services/service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  codeSubscription: Subscription;
  matrizSubscription: Subscription;
  paymentsInput = "";
  ammount: number = 0;
  @Input() first = 0;
  @Input() second = 0;
  public payments: Payments[] = [];

  constructor(private paymentsService: PaymentsService, private appService: AppService) { }

  ngOnInit() {
    this.codeSubscription = this.appService.getCode()
      .subscribe(valor => {
      });
    this.matrizSubscription = this.appService.getMatriz().subscribe(valor => {
    });
  }

  public addItem() {
    if (this.paymentsInput == "" || this.ammount < 1) {
      return;
    }
    this.paymentsService.addPayment(this.paymentsInput, this.ammount, this.code, [...this.matriz]);
    this.payments = this.paymentsService.getPayments();
  }

  get code(): string {
    return this.appService.getCode().value;
  }

  get matriz(): string[] {
    return this.appService.getMatriz().value;
  }

  postArrayPayments(payments) {
    this.paymentsService.createPayments(this.payments).subscribe(res => {
      console.log(res)
    })
  }

}
