import { Component,OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {
  transactionId ="";
  
  constructor(private router:Router,private payment : PaymentService,
    private employeepayment : EmployeeService ){ }

  ngOnInit(): void {
    this.emp =this.employeepayment.paymentsalary;
    this.acc=this.employeepayment.accountaccountno;
    this.fname=this.employeepayment.firstnamefirstName;
    this.lname=this.employeepayment.lastnamelastName;
    this.transactionId = this.payment.transactionID;
    
  }
  ok(){
    this.router.navigate(['/dashboard'])
  }
  emp:string =""
  acc:string =""
  fname:string=""
  lname:string=""
}
