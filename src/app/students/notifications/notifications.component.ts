import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailsComponentComponent } from "../details-component/details-component.component";
import { DesignerService } from "../../services/designer.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export class NotificationsComponent implements OnInit {
  orderList: any;
  constructor(
    private modalService: NgbModal,
    private designer: DesignerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.DisplayDesignersOrderNoti();
  }

  DisplayDesignersOrderNoti() {
    this.spinner.show();
    this.designer.getDesignersNotification().subscribe(
      Indata => {
        this.spinner.hide();
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
    modelref.result.then(data => {
      this.DisplayDesignersOrderNoti();
    });
  }
  onSubmit() {
    this.modalService.dismissAll();
  }
}
