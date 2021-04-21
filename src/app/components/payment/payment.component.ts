import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/listModels/creditCard';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';

import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rental } from 'src/app/models/listModels/rental';
import { Payment } from 'src/app/models/listModels/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  savedCreditCards: CreditCard[];
  creditCardForm: FormGroup;
  LoginnedUserId: Number;
  paymentModel:Payment;
  enteredCreditcard: CreditCard = {
    UserId: null,
    cardNumber: null,
    cvv: null,
    expirationDate: null,
    holderName: null,
    id: null,
  };
  constructor(
    private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCreditCardForm();
    this.LoginnedUserId = this.authService.getTokenDetail().userId;
    this.getCreditCards(this.LoginnedUserId);
    this.setPaymentModel();
    this.setPaymentModel();
    
  }
  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      holderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }
  getCreditCards(userId: Number) {
    this.creditCardService
      .getCreditCards(userId)
      .subscribe((response) => (this.savedCreditCards = response.data));
  }
  addCard() {
    if (this.creditCardForm.valid) {
      let creditCardModel = Object.assign(
        { userId: this.LoginnedUserId },
        this.creditCardForm.value
      );
      this.creditCardService
        .addCreditCard(creditCardModel)
        .subscribe((response) => {
          this.toastrService.success(response.message);
          this.getCreditCards(this.LoginnedUserId);
        });
    } else {
      this.toastrService.warning('Lütfen kart bilgilerini giriniz');
    }
  }
  pay() {
    if (this.creditCardForm.valid) {
      if (!this.authService.isAuthenticated) {
        this.toastrService.warning('Lütfen giriş yapınız');
        this.router.navigate(['login']);
      } else {
        this.paymentService.addPayment(this.paymentModel).subscribe((response)=>
        {
          this.toastrService.success(response.message)
          this.router.navigate(["cars"]) //
          
        })
      }
    } else {
      this.toastrService.warning('Lütfen ödeme bilgilerini giriniz');
    }
  }
  deleteCreditCard(creditCard: CreditCard) {
    this.creditCardService
      .deleteCreditCard(creditCard)
      .subscribe((response) => {
        this.toastrService.show(response.message);
        this.getCreditCards(this.LoginnedUserId);
      });
  }
  useSavedCard(creditCard: CreditCard) {
    this.enteredCreditcard = creditCard;
  }

  setPaymentModel()
  {
    this.activatedRoute.params.subscribe((params)=>
    {
    this.rentalService.getRentaById(parseInt(params["rentalId"])).subscribe((response)=>
    {
      let result=(response.data);
   this.paymentModel=Object.assign({rentalId:result.id,amountPaid:result.price})
   
    }
    )
    })
  }
}