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
    debugger;
    let email = localStorage.getItem("email");
    this.service.acceptPrintOrder(email, this.orderId).subscribe(data => {
      console.log(data);
    });
  }
}
