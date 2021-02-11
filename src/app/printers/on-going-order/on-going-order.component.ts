import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../button-renderer/button-renderer.component";
import { GridOptions } from "ag-grid-community";
import { PrinterService } from "../../services/printer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActiveOrderDetailsComponent } from "../active-order-details/active-order-details.component";
import { DeliveryStatusComponent } from "../delivery-status/delivery-status.component";
@Component({
  selector: "app-on-going-order",
  templateUrl: "./on-going-order.component.html",
  styleUrls: ["./on-going-order.component.css"]
})
export class OnGoingOrderComponent implements OnInit {
  ongoingOrderData: any;
  frameworkComponents: any;
  ngOnInit(): void {
    //debugger;

    this.fetchOngoingOrder();
  }
  fetchOngoingOrder() {
    let Email = localStorage.getItem("email");
    this.service.FetchOngoingOrder(Email, false).subscribe(data => {
      ////debugger;
      this.ongoingOrderData = data;
      console.log(data);
    });
  }

  gridApi: any;
  columnApi: any;
  gridOptions: any;
  columnDefs = [
    { headerName: "Order Id", field: "OrderId" },
    { headerName: "Sub-Category", field: "productSubcategory" },
    // { headerName: "Meeting Slot", field: "meetingTime", sortable: true },
    {
      headerName: "Actions",

      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        label: "Order Details",
        onClick: this.openOrderDetails.bind(this)
      }
    },
    {
      headerName: "Deliver",

      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        label: "Initiate Delivery",
        onClick: this.initiateDelivery.bind(this)
      }
    },
    {
      headerName: "Track Delivery",

      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        label: "Track",
        onClick: this.trackDelivery.bind(this)
      }
    }
  ];

  constructor(private service: PrinterService, private modalService: NgbModal) {
    this.gridOptions = <GridOptions>{
      getRowStyle: this.checkRow.bind(this)
    };
    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }
  OngridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  checkRow(params) {
    ////debugger;
    let deliveryStatus = params.data.DunzoTaskId;
    if (deliveryStatus != null) {
      //this.gridOptions.columnApi.setColumnVisible()
    }
    if (params.data.meetingslot < new Date()) {
      return {
        "background-color": "#455A64",
        color: "#FFFFFF"
      };
    }
  }

  openOrderDetails(e) {
    //debugger;
    let modelref = this.modalService.open(ActiveOrderDetailsComponent, {
      centered: true,
      size: "lg"
    });
    modelref.componentInstance.data = e.rowData;
    modelref.componentInstance.isAllOrders = false;

    modelref.result.then(data => {
      this.fetchOngoingOrder();
    });
  }
  initiateDelivery(e) {
    //debugger;
    let result = confirm(
      "This will start the deilvery Process.Please confirm to continue"
    );
    if (result) {
      this.service
        .initiateDelivery(e.rowData.OrderId, e.rowData.CustomerId)
        .subscribe(
          data => {
            console.log(data);
            if (data["eta"] == null) {
              alert("Delivery Initiation Fail.Please contact admin.");
            }
          },
          err => {
            console.log(err);
            alert("Delivery Initiation Fail.Please contact admin.");
          }
        );
    }
  }
  trackDelivery(e) {
    //debugger;
    let modelref = this.modalService.open(DeliveryStatusComponent, {
      centered: true
    });
    modelref.componentInstance.data = e.rowData;
  }
}
