import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { AdminService } from "../../services/admin.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { PayoutFormComponent } from "../payout-form/payout-form.component";
//import {PayoutFormComponent } from ''
@Component({
  selector: "app-vendor-payouts",
  templateUrl: "./vendor-payouts.component.html",
  styleUrls: ["./vendor-payouts.component.css"]
})
export class VendorPayoutsComponent implements OnInit {
  payoutList: any;
  printerPayoutList: any;
  frameworkComponents: any;
  constructor(
    private service: AdminService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }

  ngOnInit(): void {
    this.service.getDesignerPayout().subscribe(
      data => {
        this.payoutList = data;
      },
      err => {}
    );

    this.service.getPrinterPayout().subscribe(
      data => {
        this.printerPayoutList = data;
      },
      err => {}
    );
  }
  colDefPayoutList = [
    { headerName: "Order Id", field: "orderId", sortable: true, filter: true },
    {
      headerName: "Vendor Id",
      field: "VendorId",
      sortable: true,
      filter: true
    },
    {
      headerName: "Vendor Name",
      field: "VendorName",
      sortable: true,
      filter: true
    },
    {
      headerName: "Vendor Email",
      field: "VendorEmail",
      sortable: true,
      filter: true
    },
    {
      headerName: "TotalPayout",
      field: "TotalPayout",
      sortable: true,
      filter: true
    },
    {
      headerName: "AmountTransfered",
      field: "AmountTransfered",
      sortable: true,
      filter: true
    },
    {
      headerName: "PayoutTaxes",
      field: "PayoutTaxes",
      sortable: true,
      filter: true
    },
    {
      headerName: "PayoutFees",
      field: "PayoutFees",
      sortable: true,
      filter: true
    },
    {
      headerName: "Pay",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.initiatePayment.bind(this),
        label: "Pay"
      }
    }
    // {
    //   headerName: "Disable",
    //   cellRenderer: "buttonRenderer",
    //   cellRendererParams: {
    //     onClick: this.deleteprodList.bind(this),
    //     label: "ProdDelete"
    //   }
    // }
  ];

  initiatePayment(e) {
    debugger;
    console.log(e.rowData);
    var modelRef = this.modalService.open(PayoutFormComponent);
    modelRef.componentInstance.rowData = e.rowData;
    modelRef.result.then(data => {
      this.service.getPrinterPayout().subscribe(
        data => {
          this.printerPayoutList = data;
        },
        err => {}
      );
      this.service.getDesignerPayout().subscribe(
        data => {
          this.payoutList = data;
        },
        err => {}
      );
    });
  }
}
