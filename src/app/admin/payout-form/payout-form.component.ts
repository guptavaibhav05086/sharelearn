import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-payout-form",
  templateUrl: "./payout-form.component.html",
  styleUrls: ["./payout-form.component.css"]
})
export class PayoutFormComponent implements OnInit {
  @Input() rowData;
  accountDetails = {
    BankAccountNumber: null,
    IFSC: "",
    UPI: null,
    AccountHolderName: ""
  };
  payOutStatus = {
    success: false,
    failure: false
  };
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),

    orientation: new FormControl("", [Validators.required])
  });
  constructor(
    private service: AdminService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    ////debugger;
    this.service
      .getAccountDetailsVendor(
        this.rowData.VendorType,
        this.rowData.VendorEmail
      )
      .subscribe(
        data => {
          ////debugger;

          this.accountDetails = data[0];
          if (this.accountDetails == undefined) {
            alert("No Account Details Present for the Vendor");
            this.activeModal.close("Cross click");
          }
          console.log(data);
          this.productform.patchValue({
            orientation:
              this.rowData.TotalPayout -
              (this.rowData.AmountTransfered == null
                ? 0
                : this.rowData.AmountTransfered)
          });
        },
        err => {
          ////debugger;
        }
      );
  }
  initiatePayOutPrinter() {
    if (this.rowData.AmountTransfered > this.rowData.TotalPayout) {
      let result = confirm(
        "AmountTransfered is already greater then Total payout for this order.Do you want to continue"
      );
      if (result == false) {
        return;
      }
    }
    let selectedMethod = this.productform.controls["Pname"].value;
    if (selectedMethod == "Bank Account") {
      this.service
        .PrinterPaymentBank(
          this.rowData.orderId,
          this.rowData.VendorEmail,
          this.productform.controls["orientation"].value
        )
        .subscribe(
          data => {
            if (data == true) {
              alert("Printer Payout Processed");
              this.payOutStatus.success = true;
              this.payOutStatus.failure = false;
            } else {
              alert("Error in Printer Payout Processing");
              this.payOutStatus.success = false;
              this.payOutStatus.failure = true;
            }
          },
          err => {
            alert("Error in Printer Payout Processing");
            this.payOutStatus.success = false;
            this.payOutStatus.failure = true;
          }
        );
    } else if (selectedMethod == "UPI") {
      this.service
        .PrinterPaymentVpa(
          this.rowData.orderId,
          this.rowData.VendorEmail,
          this.productform.controls["orientation"].value
        )
        .subscribe(
          data => {
            if (data == true) {
              alert("Printer Payout Processed");
              this.payOutStatus.success = true;
              this.payOutStatus.failure = false;
            } else {
              alert("Error in Printer Payout Processing");
              this.payOutStatus.success = false;
              this.payOutStatus.failure = true;
            }
          },
          err => {
            alert("Error in Printer Payout Processing");
            this.payOutStatus.success = false;
            this.payOutStatus.failure = true;
          }
        );
    }
  }

  initiatePayOut() {
    if (this.rowData.AmountTransfered > this.rowData.TotalPayout) {
      let result = confirm(
        "AmountTransfered is already greater then Total payout for this order.Do you want to continue"
      );
      if (result == false) {
        return;
      }
    }
    let selectedMethod = this.productform.controls["Pname"].value;
    if (selectedMethod == "Bank Account") {
      this.service
        .DesignerPaymentBank(
          this.rowData.orderId,
          this.rowData.VendorEmail,
          this.productform.controls["orientation"].value
        )
        .subscribe(
          data => {
            if (data == true) {
              alert("Designer Payout Processed");
              this.payOutStatus.success = true;
              this.payOutStatus.failure = false;
            } else {
              alert("Error in Designer Payout Processing");
              this.payOutStatus.success = false;
              this.payOutStatus.failure = true;
            }
          },
          err => {
            alert("Error in Designer Payout Processing");
            this.payOutStatus.success = false;
            this.payOutStatus.failure = true;
          }
        );
    } else if (selectedMethod == "UPI") {
      this.service
        .DesignerPaymentVpa(
          this.rowData.orderId,
          this.rowData.VendorEmail,
          this.productform.controls["orientation"].value
        )
        .subscribe(
          data => {
            if (data == true) {
              alert("Designer Payout Processed");
              this.payOutStatus.success = true;
              this.payOutStatus.failure = false;
            } else {
              alert("Error in Designer Payout Processing");
              this.payOutStatus.success = false;
              this.payOutStatus.failure = true;
            }
          },
          err => {
            alert("Error in Designer Payout Processing");
            this.payOutStatus.success = false;
            this.payOutStatus.failure = true;
          }
        );
    }
  }
}
