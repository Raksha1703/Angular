import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'P5';
  name = 'Raksha';
  category = "opppo";
  color = 'red';
  array = ['apple','fruit','lg','acer'];
  //array[0];
  //xyz = obj[0].name
  obj = [
    {
      "id": 1,
      "name": "Lupe Gerlach",
      "category": "West Moniquehaven",     
    }
    ];
    colorfn(){
      if(this.color === 'red'){
        this.color = 'green';
      } else {
        this.color = 'red';
      }
    };
    adddata(){
      let data:any = {};
      data.id = 2;
      data.name = this.name;
      data.category = this.category;
      this.obj.push(data);
      this.name = "";
      this.category ="";
      console.log(data);
    };
    
}

