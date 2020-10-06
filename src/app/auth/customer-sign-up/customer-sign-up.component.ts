import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterUser } from "../../Models/register-user";
import { CustomerService } from "../../services/customer.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TokenRequest } from "src/app/Models/token-request";
@Component({
  selector: "app-customer-sign-up",
  templateUrl: "./customer-sign-up.component.html",
  styleUrls: ["./customer-sign-up.component.css"]
})
export class CustomerSignUpComponent implements OnInit {
  userVerificationDetails = {
    isEmailVerified: "False",
    isPhoneVerified: "False",
    phoneNumber: "",
    email: "",
    userId: "",
    role: ""
  };
  isCustomerSignUp = true;
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  serverError = false;
  error: any;
  registered = false;
  @Input() verifyUser = false;
  displayVerifyOTPM = false;
  displayVerifyOTPE = false;
  mOTP = 0;
  eOTP = 0;
  @Input() isCustomerSignUpButton=false;
  studentForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ]),
    password: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
      )
    ]),
    mobileNumber: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
      )
    ])
  });

  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private customer: CustomerService
  ) {}

  ngOnInit() {
    this.dropdownList = this._helper.getCourseList();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Courses",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      labelKey: "courseName",
      primaryKey: "courseId"
    };
    if(this.isCustomerSignUpButton == false){
      this.checkDetailsVerification();
    }
    
  }
  checkDetailsVerification() {
    debugger;
    let email = localStorage.getItem("unverifiedEmail");
    let phoneNum = localStorage.getItem("unverifiedMobile").trim();
    let data = localStorage.getItem("isEmailVerified").split(";");
    this.userVerificationDetails.isEmailVerified = data[0];

    this.userVerificationDetails.isPhoneVerified = data[1];
    this.userVerificationDetails.phoneNumber = data[2];
    this.userVerificationDetails.email = localStorage.getItem(
      "unverifiedEmail"
    );
    this.userVerificationDetails.role = localStorage.getItem("unverifiedRole");
    if (this.userVerificationDetails.isEmailVerified.trim() == "False") {
      debugger;
      this.verifyUser = true;
      this.studentForm.patchValue({
        email: email
      });
    }
    if (this.userVerificationDetails.isPhoneVerified.trim() == "False") {
      debugger;
      this.verifyUser = true;
      this.studentForm.patchValue({
        mobileNumber: phoneNum
      });
    }
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  closepopUp() {
    this.activeModal.close("Close");
  }

  registerUser() {
    debugger;
    this.spinnerService.show();
    let newUser = new RegisterUser();
    newUser.Email = this.studentForm.controls["email"].value;
    newUser.Password = this.studentForm.controls["password"].value;
    newUser.ConfirmPassword = this.studentForm.controls["password"].value;

    newUser.MobileNumber = this.studentForm.controls["mobileNumber"].value;
    newUser.FirstName = this.studentForm.controls["name"].value;

    newUser.Role = "Customer";

    this._login.registerUser(newUser).subscribe(
      data => {
        //this.login();
        this.spinnerService.hide();
        this.registered = true;
        this.serverError = false;
        this.verifyUser = true;
        this.userVerificationDetails.isEmailVerified = "False";
        this.userVerificationDetails.isPhoneVerified = "False";
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
        if (err.status == 500 && err.error.ModelState == null) {
          alert(err.error.Message);
        }
        debugger;
        this.serverError = true;
        this.error = err.error.ModelState[""];

        console.log(this.error);
      }
    );
  }

  GenerateOTP() {
    let phoneNumber = this.studentForm.controls["mobileNumber"].value;
    let email = this.studentForm.controls["email"].value;

    this.customer.generateOTP(email, phoneNumber).subscribe(data => {
      this.displayVerifyOTPM = true;
    });
  }
  verifyOTP() {
    let email = this.studentForm.controls["email"].value;
    this.customer.verifyOTP(email, this.mOTP).subscribe(
      data => {
        if (data == true) {
          this.userVerificationDetails.isPhoneVerified = "True";
          if (
            this.userVerificationDetails.isPhoneVerified == "True" &&
            this.userVerificationDetails.isEmailVerified == "True"
          ) {
            alert("Account is verified.Please Login Again to continue.");
            this.activeModal.close();
          } else {
            alert("Mobile number is verified");
          }
        } else {
          alert("InCorrect OTP");
        }

        //this.activeModal.close();
      },
      err => {
        alert("Error in OTP Generation");
      }
    );
  }
  GenerateOTPEmail() {
    let email = this.studentForm.controls["email"].value;

    this.customer.generateOTPEmail(email).subscribe(data => {
      this.displayVerifyOTPE = true;
    });
  }
  verifyOTPEmail() {
    let email = this.studentForm.controls["email"].value;
    this.customer.verifyOTPEmail(email, this.eOTP).subscribe(
      data => {
        if (data == true) {
          this.userVerificationDetails.isEmailVerified = "True";
          if (
            this.userVerificationDetails.isPhoneVerified == "True" &&
            this.userVerificationDetails.isEmailVerified == "True"
          ) {
            alert("Account is verified.Please Login Again to continue.");
            this.activeModal.close();
          } else {
            alert("Mobile number is verified");
          }
        } else {
          alert("InCorrect OTP");
        }

        //this.activeModal.close();
      },
      err => {
        alert("Error in OTP Generation");
      }
    );
  }
}
