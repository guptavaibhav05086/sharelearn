import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { WindowRefService } from "src/app/services/window-ref.service";
import { PrinterService } from "src/app/services/printer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-razorpayments",
  templateUrl: "./razorpayments.component.html",
  styleUrls: ["./razorpayments.component.css"]
})
export class RazorpaymentsComponent implements OnInit {
  @Output() transactionStatus = new EventEmitter<{
    status: string;
    tranId: string;
  }>();
  constructor(
    private winRef: WindowRefService,
    private printer: PrinterService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  createRzpayOrder(amount) {
    //debugger;
    console.log(amount);
    this.printer.generateOrderId(amount).subscribe(
      data => {
        debugger;
        console.log(data);
        this.payWithRazor(data);
      },
      err => {}
    );
  }

  payWithRazor(val) {
    debugger;
    let amount = parseFloat(val[1]);
    const options: any = {
      //key: "rzp_test_mz10cbdFCEOGCL",
      key: "rzp_live_Fg9NN5NAEvUp4N",
      //rzp_live_Fg9NN5NAEvUp4N
      amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: "INR",
      name: "RJB Internation", // company name or product name
      description: "Share and print", // product description
      image: "../../../assets/img/logo.png", // company logo or product image
      order_id: val[0], // order_id created by you in backend
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
            //Passing payment status to parent component
            this.transactionStatus.emit({
              status: "Successful",
              tranId: response.razorpay_payment_id
            });
            // const modelRef=this.modalService.open(TransactionsuccessdetailsComponent);
            // modelRef.componentInstance.transactionId =  response.razorpay_payment_id;
            // modelRef.componentInstance.transactionStatus = "Successful";
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
