import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { AgGridAngular } from "ag-grid-angular";
import { GridOptions } from "ag-grid-community";
import { DesignerService } from "../../services/designer.service";
import { CustomerService } from "../../services/customer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActiveOrdersComponent } from "../active-orders/active-orders.component";
import { BookMeetingComponent } from "../book-meeting/book-meeting.component";
import { LoginService } from "src/app/services/login.service";
import { CustomerLoginComponent } from "src/app/auth/customer-login/customer-login.component";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-ongoing-orders",
  templateUrl: "./ongoing-orders.component.html",
  styleUrls: ["./ongoing-orders.component.css"]
})
export class OngoingOrdersComponent implements OnInit {
  ongoingOrderData: any;
  frameworkComponents: any;
  ngOnInit(): void {
    debugger;
    let token = this.login.getUserToken();
    //let roe
    if (token.Token == null || token.Token == "" || token.type != "Customer") {
      this.openLogin();
    } else {
      this.fetchOngoingOrder();
    }
  }
  openLogin() {
    //event.preventDefault();
    let modelRef = this.modalService.open(CustomerLoginComponent, {
      backdrop: "static",
      keyboard: false
    });
    modelRef.componentInstance.isComingFromCartPage = true;
    modelRef.result.then(data => {
      //debugger;

      window.location.reload();
    });
  }
  fetchOngoingOrder() {
    let customerEmail = localStorage.getItem("email");
    this.spinner.show();
    //let designerEmail = "guptavaibhav.05086@gmail.com";
    this.customerService
      .FetchOngoingCustomerOrder(customerEmail, false)
      .subscribe(
        data => {
          ////debugger;
          this.ongoingOrderData = data;
          this.spinner.hide();
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
      headerName: "Meeting Cancelled",
      field: "eligibleForReschedule",
      sortable: true
    },
    {
      headerName: "Book Slot",

      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        label: "Book Slot",
        onClick: this.bookMeeting.bind(this)
      }
    },
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
    private login: LoginService,
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
  displayDeatils(item) {
    let modelref = this.modalService.open(ActiveOrdersComponent, {
      centered: true
    });
    modelref.componentInstance.data = item;
    modelref.componentInstance.isAllOrders = true;
    modelref.result.then(data => {
      this.fetchOngoingOrder();
    });
  }
  openOrderDetails(e) {
    let modelref = this.modalService.open(ActiveOrdersComponent, {
      centered: true,
      size: "lg"
    });
    modelref.componentInstance.data = e.rowData;
    modelref.componentInstance.isAllOrders = true;
    modelref.result.then(data => {
      this.fetchOngoingOrder();
    });
  }
  bookMeeting(e) {
    //debugger;
    let modelRef = this.modalService.open(BookMeetingComponent, {
      backdrop: "static",
      keyboard: false
    });
    let gapDetails = { gap: e.rowData.gap, duration: e.rowData.duration };
    modelRef.componentInstance.comingFromOrderPage = true;
    modelRef.componentInstance.gapDetails = gapDetails;
    modelRef.result.then(data => {
      let meet = {
        day: {
          year: data.mDate.year,
          day: data.mDate.day,
          month: data.mDate.month
        },
        slot: {
          hour: data.mSlot.hour,
          minute: data.mSlot.minute,
          second: data.mSlot.second
        },
        meetingDuration: data.duration
      };
      ////debugger;
      console.log(data);
      this.customerService
        .rescheduleMeetRequest(meet, e.rowData.OrderId)
        .subscribe(data => {
          this.customerService
            .rescheduleMeetNotify(meet, e.rowData.OrderId)
            .subscribe(data => {
              console.log("notifications sending Done");
            });
        });

      //this.helper.navigateToPath("/revieworder");
    });
  }
}
