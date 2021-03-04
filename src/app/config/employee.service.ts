import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = environment.url+'employees';
  constructor(private http: HttpClient) { }
  getData(obj){    
    return this.http.get<any>(this.url + obj)
  };
}
