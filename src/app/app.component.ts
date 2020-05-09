import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ApiService } from './services/api.service';
import { cardNumberValidator, cardExpDateValidator } from './services/form-validator';
import { Country } from '@models/country.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  title: string = 'PaymentWall-Exam';
  countries: Country[];
  paymentMethods: any[];
  paymentForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      amount: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, cardNumberValidator]],
      cardExp: ['', [Validators.required, cardExpDateValidator]],
      cardCVV: ['', Validators.required],
    });

    // Get API Data
    this.apiService.GetAllCountries().subscribe(data => this.countries = data);
    this.apiService.GetCountry().subscribe(data => this.paymentForm.patchValue({ 'country': data.code }));

    this.onCountryChange();
  }

  get f() { return this.paymentForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.paymentForm.invalid) {
      return;
    }
    this.showChildModal();
  }

  onCountryChange() {
    this.paymentForm.get('country').valueChanges.subscribe(async (val) => {
      this.paymentForm.patchValue({ 'paymentMethod': '' });
      this.apiService.GetPaymentMethod(val).subscribe(data => {
        this.paymentMethods = data || [];
      }, error => console.log(error));
    })
  }

  showChildModal() {
    this.childModal.show();
  }

  hideChildModal() {
    this.childModal.hide();
  }
}
