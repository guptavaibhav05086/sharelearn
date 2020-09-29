import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-customer-sign-up",
  templateUrl: "./customer-sign-up.component.html",
  styleUrls: ["./customer-sign-up.component.css"]
})
export class CustomerSignUpComponent implements OnInit {
  isCustomerSignUp = true;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
