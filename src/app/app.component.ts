import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PaymentWall-Exam';
  countries: any[] = [];
  paymentForm: FormGroup;
  testMoney: String;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      country: [[], Validators.required],
      paymentMethod: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardExp: ['', Validators.required],
      cardCVV: ['', Validators.required],
    });
    this.apiService.GetCountry().subscribe(data => this.countries.push(data));
    this.testMoney = formatCurrency(10000, 'en', 'VND');
  }

  changeCountry(e) {
    console.log(e);
  }
}
