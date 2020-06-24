import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";
import { RegisterService } from "src/app/services/register.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.css"]
})
export class ForgetpasswordComponent implements OnInit {
  message = "";
  constructor(
    public activeModal: NgbActiveModal,
    private _validator: ValidatorsService,
    private register: RegisterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  resetPassword() {
    let email = this.loginForm.controls["email"].value;
    this.message = "";
    this.spinner.show();
    this.register.forgotPasswordEmail(email).subscribe(
      data => {
        this.message = "Please check your email Id";
        this.spinner.hide();
      },
      err => {
        this.message = "Issue occured please check after some time";
        this.spinner.hide();
      }
    );
  }
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ])
  });
}
