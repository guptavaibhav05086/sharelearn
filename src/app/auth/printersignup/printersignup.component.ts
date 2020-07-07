import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { RegisterUser } from "src/app/Models/register-user";
import { LoginService } from "../../services/login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
@Component({
  selector: "app-printersignup",
  templateUrl: "./printersignup.component.html",
  styleUrls: ["./printersignup.component.css"]
})
export class PrintersignupComponent implements OnInit {
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  serverError = false;
  error: any;
  registered = false;
  studentForm = new FormGroup(
    {
      email: new FormControl("", [
        Validators.required,
        this._validator.patternValidationTrainer(
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
  // trainerForm = new FormGroup({
  //   trainerEmail: new FormControl("", [
  //     Validators.required,
  //     this._validator.patternValidation(
  //       /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  //     )
  //   ]),
  //   trainerPassword: new FormControl("", [Validators.required]),
  //   confirmPassword: new FormControl("", [Validators.required]),
  //   mobileNumber: new FormControl("", [Validators.required]),
  //   technology: new FormControl([], [Validators.required])
  // });
  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService
  ) {}
  registerUser() {
    this.spinnerService.show();
    let newUser = new RegisterUser();
    newUser.Email = this.studentForm.controls["email"].value;
    newUser.Password = this.studentForm.controls["password"].value;
    newUser.ConfirmPassword = this.studentForm.controls[
      "confirmPassword"
    ].value;
    //newUser.MobileNumber = this.studentForm.controls["mobileNumber"].value;
    newUser.Role = "Printer";

    this._login.registerUser(newUser).subscribe(
      data => {
        debugger;
        this.spinnerService.hide();
        this.registered = true;
        delay(20000);
        this._helper.navigateToPath("/verifyvendors");
      },
      err => {
        debugger;
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
  onSubmit() {
    console.log("Form submitted");
  }
}
