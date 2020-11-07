import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DesignerService } from "../../services/designer.service";

@Component({
  selector: "app-details-component",
  templateUrl: "./details-component.component.html",
  styleUrls: ["./details-component.component.css"]
})
export class DetailsComponentComponent implements OnInit {
  @Input() data;
  @Input() orderId;
  totalamount = 0;
  displayLoadingContentGif;
  constructor(
    public activeModal: NgbActiveModal,
    private service: DesignerService
  ) {}
  ngOnInit(): void {
    this.totaling();
    //this.AcceptOrder();
  }
  totaling() {
    this.data.forEach(element => {
      this.totalamount += element["Amount"] + element["professionalFeesAmount"];
    });
  }
  AcceptOrder() {
    //debugger;
    this.displayLoadingContentGif = true;
    let email = localStorage.getItem("email");
    this.service.acceptDesignerOrder(email, this.orderId).subscribe(
      data => {
        console.log(data);
        this.displayLoadingContentGif = false;
        alert("Order Accepted.Please Check Ongoing Order Section");
        this.activeModal.close();
      },
      err => {
        this.displayLoadingContentGif = false;
      }
    );
  }
}
