import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterUser } from "../../Models/register-user";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { TokenRequest } from "src/app/Models/token-request";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ForgetpasswordComponent } from "../forgetpassword/forgetpassword.component";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.css",
    "../../../assets/DashBoard/css/style.css",
    "../../../assets/DashBoard/css/theme.css"
  ]
})
export class LoginComponent implements OnInit {
  displayLoginError = false;
  loginError = "";
  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    private modalService: NgbModal
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
      this._validator.patternValidation(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
      )
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
        this.spinnerService.hide();
        this._login.setToken(data);
        if (data.role == "Designer") {
          this._helper.navigateToPath("/students/dashboard");
        } else if (data.role == "Printer") {
          this._helper.navigateToPath("/printers/profile");
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
}
