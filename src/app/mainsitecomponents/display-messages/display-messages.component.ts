import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html',
  styleUrls: ['./display-messages.component.css']
})
export class DisplayMessagesComponent implements OnInit {
  transactionsId:any;
  constructor(  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      debugger;
      console.log(params); // { order: "popular" }
      //this.cartItemId = params.itemId;
      if (params.tranId != undefined) {
        this.transactionsId=params.tranId;
      } else {
        
      }

      // popular
    });
  }

}
