import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { GridOptions } from "ag-grid-community";
import { DesignerService } from "../../services/designer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActiveOrderDetailsComponent } from "../active-order-details/active-order-details.component";
@Component({
  selector: "app-on-going-order",
  templateUrl: "./on-going-order.component.html",
  styleUrls: ["./on-going-order.component.css"]
})
export class OnGoingOrderComponent implements OnInit {
  ongoingOrderData: any;
  frameworkComponents: any;
  ngOnInit(): void {
    ////debugger;

    this.fetchOngoingOrder();
  }
  fetchOngoingOrder() {
    let designerEmail = localStorage.getItem("email");
    this.designerService
      .FetchOngoingDesignerOrder(designerEmail, false)
      .subscribe(data => {
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
    { headerName: "Meeting Slot", field: "meetingTime", sortable: true },
    {
      headerName: "Actions",

      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        label: "Order Details",
        onClick: this.openOrderDetails.bind(this)
      }
    }
  ];

  constructor(
    private designerService: DesignerService,
    private modalService: NgbModal
  ) {
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
    var todayDate = new Date();
    var meetingTime = new Date(Date.parse(params.data.meetingTime));
    var differenceinMins = -1;
    if (meetingTime > todayDate) {
      var diff = meetingTime.valueOf() - todayDate.valueOf();
      differenceinMins = Math.floor(diff / 1000 / 60);
    }

    if (differenceinMins > 0 && differenceinMins <= 60) {
      return {
        "background-color": "#7C0A02",
        color: "#FFFFFF"
      };
    }
  }

  openOrderDetails(e) {
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
}
