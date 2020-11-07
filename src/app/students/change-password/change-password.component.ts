import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { RegisterUser } from "src/app/Models/register-user";
import { LoginService } from "../../services/login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { TokenRequest } from "src/app/Models/token-request";
import { RegisterService } from "../../services/register.service";
import { ResetPassword } from "src/app/Models/reset-password";

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
  studentForm = new FormGroup(
    {
      currentpassword: new FormControl("", [
        Validators.required,
        this._validator.patternValidation(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
        )
      ]),
      password: new FormControl("", [
        Validators.required,
        this._validator.patternValidation(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
        )
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
    private register: RegisterService
  ) {}

  ngOnInit() {}

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
}
