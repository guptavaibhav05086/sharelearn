import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {

  toggleDisplayItems=false;
  name="Show Products"
  toggleItems(event){
    event.preventDefault();
    if(this.toggleDisplayItems){
      this.toggleDisplayItems=false;
      this.name="Show Products"
    }
    else{
      this.toggleDisplayItems=true;
      this.name="Hide Products"
    }

  }

  constructor() { }

  ngOnInit(): void {
  }

}
