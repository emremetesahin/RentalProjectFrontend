import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCardAdd } from 'src/app/models/addModels/creditCardAdd';
import { PaymentAdd } from 'src/app/models/addModels/paymentAdd';
import { RentalAdd } from 'src/app/models/addModels/rentalAdd';
import { CreditCard } from 'src/app/models/listModels/creditCard';

import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
@Input()rentDate:any;
@Input()returnDate:any;
@Input()carPrice:any;
creditCards:CreditCard[];
toBeProcessedCreditCard:CreditCardAdd={
  holderName:null,
  expirationDate:null,
  cvv:null,
  cardNumber:null
};
  paymentInfo:PaymentAdd={
    amountPaid:null,
    rentalId:null//ok
  };
   rentalInfo:RentalAdd={
     id:null,
    carId:null, //ok
    customerId:100,
    rentDate:null, //ok
    returnDate:null //ok
  }
  constructor(
    private creditCardService:CreditCardService,
    private paymentService:PaymentService,
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAllCreditCards();
    this.getBinding();
  }
  getBinding()
  {
    this.activatedRoute.params.subscribe((params)=>{(this.rentalInfo.carId=Number(params["carId"]))})
    this.rentalInfo.rentDate=new Date(this.rentDate)
    this.rentalInfo.returnDate=new Date(this.returnDate)
    this.rentalService.getRentals().subscribe((response)=>
    {
      this.paymentInfo.rentalId=(response.data[response.data.length-1]["id"]+1)
      this.rentalInfo.id=(response.data[response.data.length-1]["id"]+1)
    })
    this.paymentInfo.amountPaid=this.getDateDiff(this.rentalInfo.rentDate,this.rentalInfo.returnDate)*this.carPrice
    this.console();
  }
  pay()
  {
    this.rentalService.addRental(this.rentalInfo).subscribe((response)=>console.log(response))
    this.paymentService.addPayment(this.paymentInfo).subscribe((response)=>console.log(response))
    this.toastrService.success("Ödeme Başarılı")
  }

  console()
  {
    console.log(this.rentalInfo)
    console.log(this.paymentInfo)
  }

  getDateDiff(firsDate:Date,lastDate:Date)
  {
    return lastDate.getDate()-firsDate.getDate()
  }

  getAllCreditCards()
  {
    this.creditCardService.getAllCreditCards().subscribe((response)=>
    {
      this.creditCards=response.data;
    })
  }
  addCard()
  {
    this.creditCardService.addCreditCard(this.toBeProcessedCreditCard).subscribe((response)=>{      
    this.toastrService.success(response["message"])
    this.getAllCreditCards()
    });

  }
  deleteCard(creditCard:CreditCard)
  {
    this.creditCardService.deleteCreditCard(creditCard).subscribe((response)=>
    {
      this.toastrService.error(response["message"])
      this.getAllCreditCards()

    })
  }
  selectSavedCard(creditCard:CreditCard)
  {
    console.log(this.toBeProcessedCreditCard=creditCard)
  }

}
