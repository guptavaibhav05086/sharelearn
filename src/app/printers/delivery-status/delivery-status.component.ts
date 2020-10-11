import { Component, OnInit, Input } from "@angular/core";
import { PrinterService } from "../../services/printer.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-delivery-status",
  templateUrl: "./delivery-status.component.html",
  styleUrls: ["./delivery-status.component.css"]
})
export class DeliveryStatusComponent implements OnInit {
  debugger;
  @Input() data;
  trackingData: any;
  eventStartDate: any;
  constructor(
    private dService: PrinterService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    debugger;
    this.dService.trackDelivery(this.data.DunzoTaskId).subscribe(res => {
      debugger;
      this.trackingData = res;
      this.eventStartDate = new Date(this.trackingData.event_timestamp);
      //.eventStartDate=`{eventStartDate.}`
    });
  }
}
