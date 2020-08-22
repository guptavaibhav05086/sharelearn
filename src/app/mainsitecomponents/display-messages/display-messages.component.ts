import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: "app-display-messages",
  templateUrl: "./display-messages.component.html",
  styleUrls: ["./display-messages.component.css"]
})
export class DisplayMessagesComponent implements OnInit {
  transactionsId: any;
  displayError = false;
  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private custService: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      debugger;
      console.log(params); // { order: "popular" }
      //this.cartItemId = params.itemId;
      if (params.tranId != undefined && params.tranId != "null") {
        this.transactionsId = params.tranId;
        this.displayError = false;
      } else {
        this.displayError = true;
      }
      if (params.orderId != undefined && params.orderId != "null") {
        this.custService.sendNotification(params.orderId).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      } else {
      }
      //orderId

      // popular
    });
  }
  back(e) {
    e.preventDefault();
    let origin = this.document.location.origin;
    let url = origin + "/revieworder";
    window.location.href = url;
  }
}
