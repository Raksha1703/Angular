import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UsertableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getallusers();
  }
  getallusers(){
    console.log('all user loaded');
  };
}
