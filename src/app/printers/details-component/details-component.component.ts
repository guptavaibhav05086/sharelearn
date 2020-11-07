import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PrinterService } from "../../services/printer.service";
@Component({
  selector: "app-details-component",
  templateUrl: "./details-component.component.html",
  styleUrls: ["./details-component.component.css"]
})
export class DetailsComponentComponent implements OnInit {
  @Input() data;
  displayLoadingContentGif = false;
  @Input() orderId;
  totalamount = 0;
  constructor(
    public activeModal: NgbActiveModal,
    private service: PrinterService
  ) {}
  ngOnInit(): void {
    this.totaling();
  }
  totaling() {
    this.data.forEach(element => {
      this.totalamount += element["Amount"];
    });
  }
  AcceptOrder() {
    //debugger;
    this.displayLoadingContentGif = true;
    let email = localStorage.getItem("email");
    this.service.acceptPrintOrder(email, this.orderId).subscribe(
      data => {
        console.log(data);
        this.displayLoadingContentGif = false;
        alert("Order accepted Successfully");
        this.activeModal.close();
      },
      err => {
        this.displayLoadingContentGif = false;
        alert("Issue occured.Please contact Admin");
      }
    );
  }
}
