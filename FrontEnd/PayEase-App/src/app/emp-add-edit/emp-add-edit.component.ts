// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CoreService } from '../core/core.service';
// import { EmployeeService } from '../services/employee.service';
// import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';



@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  bankname: string[] = [
    'RBI-Reserve Bank Of India',
    'ICIC-Bank',
    'SBI-State Bank Of India',
    'CUB-City Union Bank',
    'HSBC-Bank',
    'HDFC-Bank',
    'Axis-Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Kotak Mahindra Bank',
    'Federal Bank'
  ];
  
 
  

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router :Router,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      employeeid:['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      emailid: ['',Validators.required],
      mobileno: ['',Validators.required],
      gender: ['',Validators.required],
      bankname: ['',Validators.required],
      accountno: ['',Validators.required],
      ifsccode: ['',Validators.required],
      salary: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data._id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
             //console.log(val)
              this._coreService.openSnackBar('Employee updated succesfully!');
              this._dialogRef.close(true);

            },
            error: (err: any) => {
              console.error(err);
            },
             });
      } else if((this.empForm.valid) ) {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
         // console.log(val)
          this._coreService.openSnackBar(' Employee added succesfully!');
          this._dialogRef.close(true);
          // this.router.navigate(['/dashboard'])
          },
          error: (err: any) => {
            console.error(err);
            
          },
        });
      }
    }
  }
}

