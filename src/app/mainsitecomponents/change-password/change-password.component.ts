import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";

import { LoginService } from "../../services/login.service";
import { CustomerService } from "../../services/customer.service";
import { NgxSpinnerService } from "ngx-spinner";

import { ActivatedRoute, ParamMap } from "@angular/router";

import { RegisterService } from "../../services/register.service";
import { ResetPassword } from "src/app/Models/reset-password";
import { VerifyOTPComponent } from "../verify-otp/verify-otp.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  serverError = false;
  error: any;
  registered = false;
  displyChangePassword = false;
  displyModifyMobile = false;
  disableeditMobile = true;
  CurrentmobileNumber;
  studentForm = new FormGroup(
    {
      mobileNumber: new FormControl("", [
        Validators.required,
        this._validator.patternValidation(
          /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
        )
      ]),
      currentpassword: new FormControl("", [
        Validators.required,
        this._validator.patternValidation(/^[A-Za-z0-9_@].{5,15}$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        this._validator.patternValidation(/^[A-Za-z0-9_@].{5,15}$/)
      ]),
      confirmPassword: new FormControl("", [Validators.required])
    },
    { validators: this._validator.confirmPasswordValidation }
  );

  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private register: RegisterService,
    private modalService: NgbModal,
    private custService: CustomerService
  ) {}

  ngOnInit() {
    debugger;
    //let type=
    let tokenDetails = this._login.getUserToken();
    if (
      tokenDetails.type != "Customer" ||
      tokenDetails.Token == null ||
      tokenDetails.Token == undefined ||
      tokenDetails.Token == ""
    ) {
      this._helper.navigateToPath("/");
    }
    this.custService.getCustomerNumber().subscribe(data => {
      this.CurrentmobileNumber = data;
    });
  }
  toggleChPass(e) {
    e.preventDefault();
    if (this.displyChangePassword) {
      this.displyChangePassword = false;
    } else {
      this.displyChangePassword = true;
      this.displyModifyMobile = false;
    }
  }
  toggleModifyPh(e) {
    e.preventDefault();
    if (this.displyModifyMobile) {
      this.displyModifyMobile = false;
    } else {
      this.displyModifyMobile = true;
      this.displyChangePassword = false;
    }
  }
  editMobile() {
    if (this.disableeditMobile) {
      this.disableeditMobile = false;
    } else {
      this.disableeditMobile = true;
    }
  }
  registerUser() {
    //debugger;
    this.spinnerService.show();
    let newUser = new ResetPassword();
    newUser.OldPassword = this.studentForm.controls["currentpassword"].value;
    newUser.NewPassword = this.studentForm.controls["password"].value;
    newUser.ConfirmPassword = this.studentForm.controls[
      "confirmPassword"
    ].value;
    newUser.Guid = this.route.snapshot.queryParams["guid"];

    this.register.changePasswordRequest(newUser).subscribe(
      data => {
        this.spinnerService.hide();
        this.registered = true;
        this.serverError = false;
        alert("Password Reset Successful.");
        this._helper.navigateToPath("/logout");
        //this._helper.navigateToLogin();
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
        if (err.status == 500 && err.error.ModelState == null) {
          alert(err.error.Message);
        }
        //debugger;
        this.serverError = true;
        this.error = err.error.ModelState[""];

        console.log(this.error);
      }
    );
  }
  generateOTP() {
    //debugger;
    let number = this.studentForm.controls["mobileNumber"].value;
    //this.message = "";
    //this.spinner.show();
    let userId = localStorage.getItem("userId");
    // let number =  this.studentForm.controls['mobileNumber'].value;
    if (
      this.studentForm.controls["mobileNumber"].value != "" &&
      !this.studentForm.controls["mobileNumber"].invalid
    ) {
      this.register.generateOTP(userId, number).subscribe(
        data => {
          //this.message = "Please check your email Id";
          //this.spinner.hide();
        },
        err => {
          //this.message = "Issue occured please check after some time";
          //this.spinner.hide();
        }
      );
    } else {
      alert("Enter Valid Mobile Number");
      return false;
    }
    return true;
  }
  openVerifyOTP() {
    let result = this.generateOTP();
    if (result) {
      const modalRef = this.modalService.open(VerifyOTPComponent, {
        backdrop: "static"
      });
      modalRef.componentInstance.name = "World";
      modalRef.componentInstance.number = this.studentForm.controls[
        "mobileNumber"
      ].value;
      modalRef.result.then(result => {
        debugger;
        if (result) {
          this.CurrentmobileNumber = this.studentForm.controls[
            "mobileNumber"
          ].value;
        }
      });
    }
  }
}
