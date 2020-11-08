import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DesignerService } from "src/app/services/designer.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"]
})
export class PaymentsComponent implements OnInit {
  payoutList: any;
  printerPayoutList: any;
  frameworkComponents: any;
  constructor(
    private service: DesignerService,

    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.service.getDesignerPayout().subscribe(
      data => {
        this.payoutList = data;
      },
      err => {}
    );
  }
  colDefPayoutList = [
    { headerName: "Order Id", field: "orderId", sortable: true, filter: true },
    // {
    //   headerName: "Vendor Id",
    //   field: "VendorId",
    //   sortable: true,
    //   filter: true
    // },
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
    }
    // {
    //   headerName: "PayoutTaxes",
    //   field: "PayoutTaxes",
    //   sortable: true,
    //   filter: true
    // },
    // {
    //   headerName: "PayoutFees",
    //   field: "PayoutFees",
    //   sortable: true,
    //   filter: true
    // }

    // {
    //   headerName: "Disable",
    //   cellRenderer: "buttonRenderer",
    //   cellRendererParams: {
    //     onClick: this.deleteprodList.bind(this),
    //     label: "ProdDelete"
    //   }
    // }
  ];
}
