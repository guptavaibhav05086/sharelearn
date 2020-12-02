import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { WindowRefService } from "src/app/services/window-ref.service";
import { PrinterService } from "src/app/services/printer.service";
import { CustomerService } from "src/app/services/customer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
@Component({
  selector: "app-razorpayments",
  templateUrl: "./razorpayments.component.html",
  styleUrls: ["./razorpayments.component.css"]
})
export class RazorpaymentsComponent implements OnInit {
  @Input() paymentAmount: number;
  @Input() orderId: any;
  @Output() transactionStatus = new EventEmitter<{
    status: string;
    tranId: string;
  }>();
  constructor(
    private winRef: WindowRefService,
    private printer: PrinterService,
    private modalService: NgbModal,
    private router: Router,
    private custService: CustomerService
  ) {}

  ngOnInit() {}

  createRzpayOrder(amount) {
    //debugger;
    console.log(amount);
    if (this.orderId != null && this.orderId != undefined) {
      this.payWithRazor(this.orderId);
    } else {
      this.custService.generateOrderId(this.paymentAmount * 100).subscribe(
        data => {
          if (this.orderId != null && this.orderId != undefined) {
            this.payWithRazor(data);
          } else {
            alert(
              "Issue in initiating the payment.Please referesh the page or try after some time"
            );
          }
        },
        err => {}
      );
    }

    // this.printer.generateOrderId((this.paymentAmount * 100)).subscribe(
    //   data => {
    //     this.payWithRazor(data);
    //   },
    //   err => {}
    // );
  }

  payWithRazor(val) {
    const options: any = {
      //key: "rzp_live_Fg9NN5NAEvUp4N",
      key: "rzp_test_mz10cbdFCEOGCL",
      amount: this.paymentAmount * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: "INR",
      name: "shapeNprint", // company name or product name
      description: "shapeNprint", // product description
      image: "../../../assets/img/logo.png", // company logo or product image
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
      this.custService
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
            // this.router.navigateByUrl("/ordersuccess").then(e => {
            //   if (e) {
            //     console.log("navigation successful");
            //   } else {
            //     console.log("navigation failed");
            //   }
            // });
          },
          err => {
            this.transactionStatus.emit({
              status: "Failure",
              tranId: null
            });
            console.log(err);
          }
        );
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      this.transactionStatus.emit({
        status: "Transaction cancelled.",
        tranId: null
      });
      console.log("Transaction cancelled.");
    };
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
