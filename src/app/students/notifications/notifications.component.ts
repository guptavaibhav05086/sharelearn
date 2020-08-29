import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailsComponentComponent } from "../details-component/details-component.component";
import { DesignerService } from "../../services/designer.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export class NotificationsComponent implements OnInit {
  orderList: any;
  constructor(
    private modalService: NgbModal,
    private designer: DesignerService
  ) {}

  ngOnInit(): void {
    this.DisplayDesignersOrderNoti();
  }

  DisplayDesignersOrderNoti() {
    this.designer.getDesignersNotification().subscribe(
      Indata => {
        this.orderList = Indata;
      },
      () => {}
    );
  }
  openModal(orderDeatils, orderId) {
    let modelref = this.modalService.open(DetailsComponentComponent, {
      centered: true,
      size: "lg"
    });
    modelref.componentInstance.data = orderDeatils;
    modelref.componentInstance.orderId = orderId;
  }
  onSubmit() {
    this.modalService.dismissAll();
  }
}
