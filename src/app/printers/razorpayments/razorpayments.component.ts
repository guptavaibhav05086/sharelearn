import { Component, OnInit } from "@angular/core";
import { WindowRefService } from "src/app/services/window-ref.service";
import { PrinterService } from "src/app/services/printer.service";

@Component({
  selector: "app-razorpayments",
  templateUrl: "./razorpayments.component.html",
  styleUrls: ["./razorpayments.component.css"]
})
export class RazorpaymentsComponent implements OnInit {
  constructor(
    private winRef: WindowRefService,
    private printer: PrinterService
  ) {}

  ngOnInit() {}

  createRzpayOrder(amount) {
    debugger;
    console.log(amount);
    this.printer.generateOrderId(amount).subscribe(
      data => {
        this.payWithRazor(data);
      },
      err => {}
    );
  }

  payWithRazor(val) {
    const options: any = {
      key: "rzp_test_mz10cbdFCEOGCL",
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: "INR",
      name: "RJB Internation", // company name or product name
      description: "Share and print", // product description
      image: "./assets/logo.png", // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: "#0c238a"
      }
    };
    options.handler = (response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      this.printer
        .validateTransaction(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        )
        .subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      console.log("Transaction cancelled.");
    };
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
