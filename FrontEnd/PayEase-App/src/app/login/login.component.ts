import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  


  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
    ngOnInit(): void{
 this.loginForm=this.formBuilder.group({
  email:['',Validators.required],
  password:['',Validators.required]
 })
    }

    login() {
      this.http.get<any[]>("http://localhost:3000/signupusers")
        .subscribe(
          res => {
            const user = res.find((a: any) => {
              return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
            });
    
            if (user) {
              //alert("Login Success..!!");
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);
            } else {
              alert("User not found, login with correct credentials..!!");
            }
          },
          err => {
            alert("Something went wrong");
          }
        );
    }




  
    /*login(){
     
      
      this.http.get<any>("http://localhost:3000/signupusers")
      .subscribe(res=>{
        const user = res.data.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        
       });

      if(user){
   
   alert("Login Success..!!");
   this.loginForm.reset();
   this.router.navigate(['/dashboard'])

 }else{
   alert("user not found,login with correct credentials..!!");
 }
},err=>{
 alert("something went wrong");
});
   }*/














   /* login(){
     
      
       this.http.get<any>("http://localhost:3000/signupusers")
       .subscribe(res=>{
         const user = res.find((a:any)=>{
         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
         
        });

       if(user){
    
    alert("Login Success..!!");
    this.loginForm.reset();
    this.router.navigate(['/dashboard'])

  }else{
    alert("user not found,login with correct credentials..!!");
  }
},err=>{
  alert("something went wrong");
})
    }*/
  }
