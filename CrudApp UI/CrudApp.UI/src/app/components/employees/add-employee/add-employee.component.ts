import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmpForm!: FormGroup;
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    department: ''
  };

  constructor(private fb: FormBuilder, private employeeService: EmployeesService, private router: Router) { }

  ngOnInit(): void {
    this.addEmpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
    })
  }

  save() {
    this.addEmployeeRequest = {
      id:"",
      name: this.addEmpForm.value.name,
      email: this.addEmpForm.value.email,
      department: this.addEmpForm.value.department,
    }
    this.employeeService.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next: (employee) => {
        this.router.navigate(['employees']);
        alert("Employee added successfully");
      } 
    })
  }
}
