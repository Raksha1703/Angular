import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  users:any = [];
  page = 1;
  constructor (private http : HttpClient) { }
    ngOnInit() {
      this.namechange();
    }
    namechange(){
      this.http.get<any>('https://reqres.in/api/users?page='+this.page).subscribe(resp=> {
        this.users=resp.data;
        console.log(this.users);
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


}
