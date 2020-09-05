import { Component, OnInit } from '@angular/core';
import { ButtonrendererComponent } from "../button-renderer/button-renderer.component"
import { GridOptions } from "ag-grid-community";
import { PrinterService } from "../../services/printer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  ongoingOrderData: any;
  frameworkComponents: any;
  constructor(private printerservice: PrinterService,
    private modalService: NgbModal) { 
      this.gridOptions = <GridOptions>{
        getRowStyle: this.checkRow.bind(this)
      };
      this.frameworkComponents = {
        buttonRenderer: ButtonrendererComponent
      };
    }

  ngOnInit(): void {
  }
  // fetchOngoingOrder() {
  //   let printerEmail = localStorage.getItem("email");
  //   this.printerservice
  //     .FetchOngoingDesignerOrder(printerEmail, true)
  //     .subscribe(data => {
  //       debugger;
  //       this.ongoingOrderData = data;
  //       console.log(data);
  //     });
  // }

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
        //onClick: this.openOrderDetails.bind(this)
      }
    }
  ];
  OngridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  checkRow(params) {
    debugger;
    if (params.data.meetingslot < new Date()) {
      return {
        "background-color": "#455A64",
        color: "#FFFFFF"
      };
    }
  }

  // openOrderDetails(e) {
  //   let modelref = this.modalService.open(ActiveOrderDetailsComponent, {
  //     centered: true,
  //     size: "lg"
  //   });
  //   modelref.componentInstance.data = e.rowData;
  //   modelref.result.then(data => {
  //     this.fetchOngoingOrder();
  //   });
  // }

}
