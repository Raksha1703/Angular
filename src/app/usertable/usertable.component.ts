import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss'],
})
export class UsertableComponent implements OnInit {
  employees: any = [];
  
  search = '';
  id = 0;
  name = '';
  position = '';
  office = '';
  age;
  startdate;
  salary;
  loading = true;
  pagination = '';
  page = 1;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.namechange();
  }
  namechange(obj = '') {
    this.http.get<any>('http://127.0.0.1:8000/api/employees?' + obj).subscribe(
      (resp) => {
        this.employees = resp.employee.data;
        this.pagination = resp.employee.link;
        this.loading = false;
        console.log(this.employees);
      },
      (error) => {
        console.log(error);
        this.loading = true;
      }
    );
  }
  next() {
    this.page = this.page + 1;
    this.namechange();
  }
  pre() {
    this.page = this.page - 1;
    this.namechange();
  }
  getemployee() {
    let obj = `name=${this.search}`;
    this.namechange(obj);
    this.namechange();
  }
  addemployee() {
    let data = {
      name: this.name,
      position: this.position,
      office: this.office,
      age: this.age,
      startdate: this.startdate,
      salary: this.salary,
    };
    console.log(data);
    this.http.post<any>('http://127.0.0.1:8000/api/employees', data).subscribe(
      (resp) => {
        console.log(resp);
        this.name = this.position = this.age = this.office = this.startdate = this.salary ='';
        this.getemployee();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateemployee(emp) {
    this.id = emp.id;
    this.name = emp.name;
    this.position = emp.position;
    this.age = emp.age;
    this.office = emp.office;
    this.startdate = new Date(emp.startdate);
    this.salary = emp.salary;
  }
  editemployee() {
    let data = {
      name: this.name,
      position: this.position,
      office: this.office,
      age: this.age,
      startdate: this.startdate,
      salary: this.salary,
    };
    this.http
      .put<any>('http://127.0.0.1:8000/api/employees/'+this.id,data)
      .subscribe((resp) => {
        console.log(resp);
        this.name = this.position = this.age = this.office = this.startdate = this.salary =
          '';
        this.getemployee();
      });
  }
  deleteemployee(id) {
    let url = 'http://127.0.0.1:8000/api/employees/';
    this.http.delete(url + id).subscribe((resp) => {
      console.log(resp);
      this.getemployee();
    });
  }
}
