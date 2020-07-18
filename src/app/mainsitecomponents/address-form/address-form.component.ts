import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AddressRequest } from "src/app/Models/address-request";
import { CustomerService } from "src/app/services/customer.service";
import { ValidatorsService } from "src/app/services/validators.service";
@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.css"]
})
export class AddressFormComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private custService: CustomerService,
    private _validator: ValidatorsService
  ) {}
  userAddress = "";
  userPhone = "";
  contactPerson = "";
  displaySaveButton = false;
  invalidMobile = false;
  addressRequest: AddressRequest;
  @Input() editAddress;
  ngOnInit(): void {
    this.addressRequest = new AddressRequest();
    debugger;
    if (this.editAddress != null && this.editAddress != undefined) {
      this.userAddress = this.editAddress.address;
      this.userPhone = this.editAddress.phoneNumber;
      this.contactPerson = this.editAddress.userName;
      this.addressRequest.AddressId = this.editAddress.addId;
    }
  }
  getAddress(place: any) {
    console.log(place);
    this.userAddress = place["formatted_address"];
    this.addressRequest.address = place["formatted_address"];
    this.addressRequest.lattitude = place.geometry.location.lat();
    this.addressRequest.longitude = place.geometry.location.lng();

    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
    //this.displaySaveButton = false;
  }
  validateMobile() {
    var expression = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    var pattern: RegExp = new RegExp(expression);
    var result = pattern.test(this.userPhone);
    if (result == false) {
      this.invalidMobile = true;
    } else {
      this.invalidMobile = false;
    }
  }
  saveAddress() {
    if (
      this.userAddress == "" ||
      this.userPhone == "" ||
      this.contactPerson == "" ||
      this.invalidMobile == true
    ) {
      alert("Please enter correct values for fields");
      return;
    }
    this.addressRequest.userId = "5541713c-e1b5-4ed4-9e36-a92f0eab91d3";
    this.addressRequest.phoneNumber = this.userPhone;
    this.addressRequest.userName = this.contactPerson;
    this.displaySaveButton = true;
    this.custService.updateAddressRequest(this.addressRequest).subscribe(
      data => {
        console.log(data);
        alert("Address saved successfully");
        this.activeModal.close("closed");
      },
      err => {
        this.displaySaveButton = false;
        alert("Issue in saving address.Please try again");
        console.log(err);
      }
    );
  }
}
