import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterUser } from "../../Models/register-user";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { TokenRequest } from "src/app/Models/token-request";
@Component({
  selector: "app-designersignup",
  templateUrl: "./designersignup.component.html",
  styleUrls: ["./designersignup.component.css"]
})
export class DesignersignupComponent implements OnInit {
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  serverError = false;
  error: any;
  registered = false;
  @Input() isCustomerSignUp = false;
  studentForm = new FormGroup(
    {
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
      confirmPassword: new FormControl("", [Validators.required])
    },
    { validators: this._validator.confirmPasswordValidation }
  );

  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService
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
  registerUser() {
    //debugger;
    this.spinnerService.show();
    let newUser = new RegisterUser();
    newUser.Email = this.studentForm.controls["email"].value;
    newUser.Password = this.studentForm.controls["password"].value;
    newUser.ConfirmPassword = this.studentForm.controls[
      "confirmPassword"
    ].value;
    // newUser.MobileNumber = this.studentForm.controls["mobileNumber"].value;
    if (this.isCustomerSignUp === true) {
      newUser.Role = "Customer";
    } else {
      newUser.Role = "Designer";
    }

    this._login.registerUser(newUser).subscribe(
      data => {
        this.spinnerService.hide();
        this.registered = true;
        this.serverError = false;
        localStorage.setItem("unverifiedRole", "Designer");
        localStorage.setItem("unverifiedEmail", newUser.Email);
        localStorage.setItem("isEmailVerified", "False");
        //localStorage.setItem("unverifiedUserId", data.userId);
        this._helper.navigateToPath("/verifyvendors");
        // let tokenRequest = new TokenRequest();
        // tokenRequest.password = newUser.Password;
        // tokenRequest.username = newUser.Email;
        // this._login.getToken(tokenRequest).subscribe(
        //   data => {
        //     this._login.setToken(data);
        //     this._helper.navigateToPath("/students/designerprofile");
        //   },
        //   err => {}
        // );
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
