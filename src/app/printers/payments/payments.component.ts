import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PrinterService } from "../../services/printer.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
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
    private service: PrinterService,

    private spinner: NgxSpinnerService
  ) {
    // this.frameworkComponents = {
    //   buttonRenderer: ButtonrendererComponent
    // };
  }

  ngOnInit(): void {
    this.service.getPrinterPayout().subscribe(
      data => {
        this.printerPayoutList = data;
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
