import { Component, OnInit, Input } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { AgGridAngular } from "ag-grid-angular";
import { GridOptions } from "ag-grid-community";
import { DesignerService } from "../../services/designer.service";
import { CustomerService } from "../../services/customer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActiveOrdersComponent } from "../active-orders/active-orders.component";
import { HelperService } from "src/app/services/helper.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-all-orders",
  templateUrl: "./all-orders.component.html",
  styleUrls: ["./all-orders.component.css"]
})
export class AllOrdersComponent implements OnInit {
  ongoingOrderData: any;
  frameworkComponents: any;
  ngOnInit(): void {
    ////debugger;
    let token = localStorage.getItem("Token");
    if (token == null || token == "") {
      this._helper.navigateToPath("/homePage");
    }
    this.fetchOngoingOrder();
  }
  fetchOngoingOrder() {
    let customerEmail = localStorage.getItem("email");
    this.spinner.show();
    //let designerEmail = "guptavaibhav.05086@gmail.com";
    this.customerService
      .FetchOngoingCustomerOrder(customerEmail, true)
      .subscribe(
        data => {
          ////debugger;
          this.spinner.hide();
          this.ongoingOrderData = data;
          console.log(data);
        },
        err => {
          this.spinner.hide();
        }
      );
  }

  gridApi: any;
  columnApi: any;
  gridOptions: any;
  columnDefs = [
    { headerName: "Order Id", field: "OrderId", sortable: true },
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
    private customerService: CustomerService,
    private modalService: NgbModal,
    private _helper: HelperService,
    private spinner: NgxSpinnerService
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
    let modelref = this.modalService.open(ActiveOrdersComponent, {
      centered: true,
      size: "lg"
    });
    modelref.componentInstance.data = e.rowData;
    modelref.componentInstance.isAllOrders = true;
    modelref.componentInstance.displayOnGoingOrdersElement = false;
    //modelref.componentInstance.userFinishedOrders=
    modelref.result.then(data => {
      this.fetchOngoingOrder();
    });
  }
  displayDeatils(item) {
    let modelref = this.modalService.open(ActiveOrdersComponent, {
      centered: true
    });
    modelref.componentInstance.data = item;
    modelref.componentInstance.isAllOrders = true;
    modelref.componentInstance.displayOnGoingOrdersElement = false;
    modelref.result.then(data => {
      this.fetchOngoingOrder();
    });
  }
}
