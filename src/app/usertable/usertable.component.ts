import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss'],
})
export class UsertableComponent implements OnInit {
  employees: any = [];
  url = 'http://127.0.0.1:8000/api/employees/';
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
  mode = "save";
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.namechange();
  }
  namechange(obj = '') {
    this.http.get<any>(this.url + obj).subscribe(
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
    this.http.post<any>(this.url, data).subscribe(
      (resp) => {
        console.log(resp);
        this.cleardata();
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
    this.mode="edit";
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
      .put<any>(this.url+this.id,data)
      .subscribe((resp) => {
        console.log(resp);
        this.cleardata();
        this.mode='save';
        this.getemployee();
      });
  }
  deleteemployee(id) {    
    this.http.delete(this.url + id).subscribe((resp) => {
      console.log(resp);
      this.getemployee();
    });
  }
  cancleemployee(){
    this.mode="save";
    this.cleardata();
  }
  cleardata(){
    this.name = this.position = this.age = this.office = this.startdate = this.salary = '';
  }
}
