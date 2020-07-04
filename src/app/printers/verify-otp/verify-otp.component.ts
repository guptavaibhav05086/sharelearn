import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";
import { RegisterService } from "src/app/services/register.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.css"]
})
export class VerifyOTPComponent implements OnInit {
  message = "";
  constructor(
    public activeModal: NgbActiveModal,
    private _validator: ValidatorsService,
    private register: RegisterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  resetPassword() {
    let number = this.studentForm.controls["mobileNumber"].value;
    this.message = "";
    this.spinner.show();
    let userId = localStorage.getItem("userId");
    // let number =  this.studentForm.controls['mobileNumber'].value;
    this.register.verifyOTP(userId, number).subscribe(
      data => {
        this.message = "Validation is Done";
        this.spinner.hide();
      },
      err => {
        this.message = "Issue occured please check after some time";
        this.spinner.hide();
      }
    );
  }
  studentForm = new FormGroup({
    mobileNumber: new FormControl("", [Validators.required])
  });
}
