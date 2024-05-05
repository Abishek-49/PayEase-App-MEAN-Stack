import { Component,ViewChild,OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  displayedColumns: string[] = [
    //'id',
    'employeeid',
    'firstName',
    'lastName',
    'emailid',
    'mobileno',
    'gender',
    'bankname',
    'accountno',
    'ifsccode',
    'salary',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  
  

  

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  salary :string=""
  accountno :string=""
  ifsccode :string=""
  firstName:string=""
  lastName:string=""

  onPaymentGatewayClick(row:any){
   //console.log(row.salary)
   //this.selectedRow = row.salary;
   this.salary=row.salary,
   this.firstName=row.firstName,
   this.lastName=row.lastName,
   this.accountno=row.accountno,
   this.ifsccode=row.ifsccode
   this._empService.payment(this.salary)
   this._empService.account(this.accountno)
   this._empService.code(this.ifsccode)
   this._empService.firstname(this.firstName)
   this._empService.lastname(this.lastName)
    this.router.navigate(['/payment-gateway'])
  }


  openAddEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._coreService.openSnackBar('Employee added succesfully!', 'done');
          this.getEmployeeList();
          
        }
      },
    });
  }



  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
        
      },
      
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: string) {
    if(confirm("Are you sure"))
    this._empService.deleteEmployee(id).subscribe({
      next: (res) =>{
      
      //console.log(result)
      this._coreService.openSnackBar('Employee deleted!', 'done');
      this.getEmployeeList();
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();

        }
      },
    });
  }
}
 



