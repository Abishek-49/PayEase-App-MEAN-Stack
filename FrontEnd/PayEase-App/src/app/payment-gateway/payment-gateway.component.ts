import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  
  //salary = 0;
  

 @ViewChild('paymentRef',{static: true}) paymentRef!: ElementRef;

 //selectedRow:any;
  //row: any;
  //salary: any;
  //salary: any;


  constructor(private router:Router,private payment: PaymentService,
    private employeepayment : EmployeeService) {}

  ngOnInit(): void {
    this.emp =this.employeepayment.paymentsalary;
    this.acc=this.employeepayment.accountaccountno;
    this.code=this.employeepayment.codeifsccode;
    this.fname=this.employeepayment.firstnamefirstName;
    this.lname=this.employeepayment.lastnamelastName;
    


  
    
   
    //this.amount = this.amount.totalSalary;
    window.paypal.Buttons(

      {
        style:{
          
          layout:'horizontal',
          shape:'rect',
          color:'blue',
          label:'paypal'
        },
        
        createOrder: (data:any,actions:any)=>{
          
          return actions.order.create({
            purchase_units:[
              {
                amount: {

                  value : this.emp.toString(),
                  currency_code: 'USD'
                }
                
              }
            ]
          });
          
        },
    
        
        onApprove : (data:any,actions:any)=>{
          return actions.order.capture().then((details:any)=>{
            if(details.status ==='COMPLETED'){
            this.payment.transactionID = details.id;
            this.router.navigate(['/payment-confirmation'])
            }
          });
        },
        onError:(error:any)=>{
         
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }
  
  cancel(){
    this.router.navigate(['/payment-cancel'])
  }

emp:string =""
acc:string =""
code:string=""
fname:string=""
lname:string=""


}

