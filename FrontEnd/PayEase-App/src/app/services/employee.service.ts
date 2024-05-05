import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  constructor(private _http: HttpClient) {}

  paymentsalary :string = ""
  accountaccountno: string = ""
  codeifsccode:string=""
  firstnamefirstName:string=""
  lastnamelastName:string=""

  payment(data :string){
    this.paymentsalary = data;}

    account(data : string){
    this.accountaccountno = data;
    }
    code(data :string){
    this.codeifsccode=data;
    }
    firstname(data:string){
      this.firstnamefirstName=data;
    }
    lastname(data:string){
      this.lastnamelastName=data;
    }
  



  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/getemployee', data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/getemployee');
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/getemployee/${id}`, data);
  }

 

  deleteEmployee(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/getemployee/${id}`);
  }
}