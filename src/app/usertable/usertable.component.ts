import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UsertableComponent implements OnInit {
  employees:any = [];
  search = "";
  loading = true;
  pagination = "";
  page = 1;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.namechange();
  }
  namechange(obj = ""){
      this.http.get<any>('http://127.0.0.1:8000/api/employees?'+obj).subscribe(resp=> {
      this.employees=resp.employee.data;
      this.pagination=resp.employee.link;
      this.loading = false;
      console.log(this.employees);
    },error=>{
      console.log(error);
      this.loading = true;
    })
  };
  next(){
    this.page = this.page + 1;
    this.namechange();
  };
  pre(){
    this.page = this.page - 1;
    this.namechange();
  };
  getemployee(){
    let obj =`name=${this.search}`;
    this.namechange(obj);
    this.namechange();
  };
}
