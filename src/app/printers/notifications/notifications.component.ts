import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { DetailsComponentComponent } from "../details-component/details-component.component";
import { NgxSpinnerService } from "ngx-spinner";
import { PrinterService } from "../../services/printer.service";
@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export class NotificationsComponent implements OnInit {
  // orderList=[
  //   {orderId :100,
  //     notificationDate: '01/09/2020' },
  //   {
  //     orderId :101,
  //     notificationDate: '02/09/2020'
  //   }
  // ]
  orderList: any;
  constructor(
    private modalService: NgbModal,
    private printer: PrinterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.printer.fetchNotifications().subscribe(data => {
      this.orderList = data;
      this.spinner.hide();
    });
    //this.DisplayPrinterOrderNoti();
  }
  //   DisplayPrinterOrderNoti(){
  //     this.printer.getDesignersNotification().subscribe(Indata=>{
  //       this.orderList.push(Indata);
  //     },()=>{});
  //   }
  openModal(orderDeatils, orderId) {
    //debugger;
    let modelref = this.modalService.open(DetailsComponentComponent, {
      centered: true,
      size: "lg"
    });
    modelref.componentInstance.data = orderDeatils;
    modelref.componentInstance.orderId = orderId;
    modelref.result.then(data => {
      this.printer.fetchNotifications().subscribe(data => {
        this.orderList = data;
      });
    });
  }
  onSubmit() {
    this.modalService.dismissAll();
  }
}
