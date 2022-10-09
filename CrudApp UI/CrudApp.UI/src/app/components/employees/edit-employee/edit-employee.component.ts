import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  editEmployee: any;
  editEmpForm!: FormGroup;
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    department: ''
  };

  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private router: Router, private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.editEmpForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]]
    });
    const id = String(this.ar.snapshot.paramMap.get('id'));
    this.employeeService.getEmployee(id).subscribe(emp => {
      this.employeeDetails = emp;
    });
  }

  save() {
    var updateEmployee: Employee = {
      id:this.editEmpForm.value.id,
      name:this.editEmpForm.value.name,
      email:this.editEmpForm.value.email,
      department:this.editEmpForm.value.department
    }
    this.employeeService.updateEmployee(updateEmployee.id, updateEmployee)
      .subscribe({
        next: (emp) => {
          this.router.navigate(['employees']);
        }
      });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (e) => {
          this.router.navigate(['employees']);
        },
        error: (er) => {
          console.log(er);
        }
      });
  }

}
