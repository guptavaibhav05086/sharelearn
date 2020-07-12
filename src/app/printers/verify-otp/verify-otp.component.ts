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
  verified = false;
  constructor(
    public activeModal: NgbActiveModal,
    private _validator: ValidatorsService,
    private register: RegisterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  closeModel() {
    this.activeModal.close(this.verified);
  }
  verifyOTP() {
    let number = this.studentForm.controls["mobileNumber"].value;
    let userId = localStorage.getItem("userId");
    this.message = "";
    this.spinner.show();
    this.register.verifyOTP(number, userId).subscribe(
      data => {
        this.message = "Phone# Validated";
        this.spinner.hide();
        this.verified = true;
      },
      err => {
        this.message = "Issue occured please check after some time";
        this.spinner.hide();
        this.verified = false;
      }
    );
  }
  studentForm = new FormGroup({
    mobileNumber: new FormControl("", [Validators.required])
  });
}
