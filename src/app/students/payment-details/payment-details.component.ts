import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HelperService } from "src/app/services/helper.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BankAccountModel } from "src/app/Models/bank-account-model";
import { DesignerService } from "../../services/designer.service";
@Component({
  selector: "app-payment-details",
  templateUrl: "./payment-details.component.html",
  styleUrls: ["./payment-details.component.css"]
})
export class PaymentDetailsComponent implements OnInit {
  accountDetails: BankAccountModel;
  displayCreateForm = false;
  displayEditForm = false;
  hideView = false;
  flag = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  serverError = false;
  error: any;
  registered = false;
  bankdetails: Array<BankAccountModel>;
  studentForm = new FormGroup(
    {
      ID: new FormControl(0),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
      IFSC: new FormControl("", [Validators.required]),
      PAN: new FormControl("", [
        Validators.required,
        this._validator.patternValidation(
          /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
        )
      ]),
      UPI: new FormControl("", [])
    },
    { validators: this._validator.confirmPasswordValidation }
  );
  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService,
    private _designerService: DesignerService,
    private spinnerService: NgxSpinnerService
  ) {}
  submitAccountDetails() {
    this.spinnerService.show();

    this.accountDetails.AccountHolderName = this.studentForm.controls[
      "email"
    ].value;
    this.accountDetails.BankAccountNumber = this.studentForm.controls[
      "password"
    ].value;
    this.accountDetails.ID = this.studentForm.controls["ID"].value;
    this.accountDetails.IFSC = this.studentForm.controls["IFSC"].value;
    this.accountDetails.PAN = this.studentForm.controls["PAN"].value;
    this.accountDetails.UserEmail = localStorage.getItem("email");
    this._designerService.UpdateBankDetails(this.accountDetails).subscribe(
      data => {
        this.spinnerService.hide();
        console.log(data);
        this.displayEditForm = false;
        this.fetchAccountDetails();
        this.hideView = false;
      },
      err => {
        this.spinnerService.hide();
      }
    );
  }
  EditAccountDetails(ID) {
    let item = this.bankdetails.filter(item => item.ID == ID);

    if (item.length > 0) {
      let selItem = item[0];
      this.studentForm.patchValue({
        email: selItem.AccountHolderName,
        password: selItem.BankAccountNumber,
        confirmPassword: selItem.BankAccountNumber,
        IFSC: selItem.IFSC,
        PAN: selItem.PAN,
        ID: ID
      });
    }
    this.displayEditForm = true;
    this.hideView = true;
  }
  ngOnInit() {
    this.accountDetails = new BankAccountModel();
    this.fetchAccountDetails();
  }
  fetchAccountDetails() {
    this._designerService.GetBankDetails().subscribe(data => {
      this.bankdetails = data;
      if (this.bankdetails.length > 0) {
        this.displayCreateForm = false;
      } else {
        this.displayCreateForm = true;
      }
    });
  }
}
