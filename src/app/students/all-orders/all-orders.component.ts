import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { GridOptions } from "ag-grid-community";
import { DesignerService } from "../../services/designer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActiveOrderDetailsComponent } from "../active-order-details/active-order-details.component";

@Component({
  selector: "app-all-orders",
  templateUrl: "./all-orders.component.html",
  styleUrls: ["./all-orders.component.css"]
})
export class AllOrdersComponent implements OnInit {
  ongoingOrderData: any;
  frameworkComponents: any;
  ngOnInit(): void {
    //debugger;

    this.fetchOngoingOrder();
  }
  fetchOngoingOrder() {
    let designerEmail = localStorage.getItem("email");
    this.ongoingOrderData = null;
    this.designerService
      .FetchOngoingDesignerOrder(designerEmail, true)
      .subscribe(data => {
        //debugger;
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
    //debugger;
    if (params.data.meetingslot < new Date()) {
      return {
        "background-color": "#455A64",
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
    modelref.componentInstance.isAllOrders = true;
    modelref.result.then(data => {
      //debugger;
      this.fetchOngoingOrder();
    });
  }
}
