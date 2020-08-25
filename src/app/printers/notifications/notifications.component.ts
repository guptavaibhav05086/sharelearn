import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailsComponentComponent } from "../details-component/details-component.component";
import { PrinterService } from "../../services/printer.service";
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  orderList=[
    {orderId :100,
      notificationDate: '01/09/2020' },
    {
      orderId :101,
      notificationDate: '02/09/2020' 
    }
  ]
  constructor(private modalService: NgbModal, private printer: PrinterService) { }

  ngOnInit(): void {
    //this.DisplayPrinterOrderNoti();
  }
//   DisplayPrinterOrderNoti(){
//     this.printer.getDesignersNotification().subscribe(Indata=>{
//       this.orderList.push(Indata);
//     },()=>{});
//   }
  openModal(orderDeatils) {
    let modelref=this.modalService.open(DetailsComponentComponent, {
     centered: true
    });
    modelref.componentInstance.data=orderDeatils;
}
onSubmit() {
  this.modalService.dismissAll();
 
 }
}
