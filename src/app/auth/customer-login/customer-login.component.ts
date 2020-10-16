import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterUser } from "../../Models/register-user";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { TokenRequest } from "src/app/Models/token-request";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ForgetpasswordComponent } from "../forgetpassword/forgetpassword.component";
@Component({
  selector: "app-customer-login",
  templateUrl: "./customer-login.component.html",
  styleUrls: ["./customer-login.component.css"]
})
export class CustomerLoginComponent implements OnInit {
  displayLoginError = false;
  loginError = "";
  @Input() isComingFromCartPage = false;
  //socialusers = new Socialusers();
  constructor(
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ]),
    password: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(/^([a-zA-Z0-9]{6,15})$/)
    ])
  });
  ngOnInit() {}

  login() {
    let loginRequest = new TokenRequest();
    loginRequest.username = this.loginForm.controls["email"].value;
    loginRequest.password = this.loginForm.controls["password"].value;
    this.spinnerService.show();
    this._login.getToken(loginRequest).subscribe(
      data => {
        debugger;
        this.spinnerService.hide();
        let verification = data.emailVerified.split(";");
        if (
          verification[0].trim() == "False" ||
          verification[1].trim() == "False"
        ) {
          localStorage.setItem("unverifiedRole", data.role);
          localStorage.setItem("unverifiedEmail", data.userName);
          localStorage.setItem("unverifiedUserId", data.userId);
          localStorage.setItem("unverifiedMobile", verification[2]);
          localStorage.setItem("isEmailVerified", data.emailVerified);
          localStorage.setItem("emailVerificationDone", verification[0].trim());
          localStorage.setItem(
            "mobileVerificationDone",
            verification[1].trim()
          );
          if (verification[0].trim() == "True") {
            if (data.role == "Customer") {
              this._login.setToken(data);
              this.activeModal.close();
            }
          } else {
            this._login.setUnverifiedToken(data);
            this.activeModal.close("OpenVerify");
          }
        } else {
          if (data.role == "Customer") {
            this._login.setToken(data);
            this.activeModal.close();
          } else {
            alert("Invalid User Name password");
          }
        }
      },
      err => {
        this.spinnerService.hide();
        this.displayLoginError = true;
        this.loginError = err.error.error_description;
        console.log(err.error.error_description);
      }
    );
  }
  openForgetPassword() {
    const modalRef = this.modalService.open(ForgetpasswordComponent);
    modalRef.componentInstance.name = "World";
  }
  openSignUpPage(e) {
    e.preventDefault();
    this.activeModal.close("OpenSignUp");
  }
}
