import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AddressRequest } from "src/app/Models/address-request";
import { CustomerService } from "src/app/services/customer.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { HelperService } from "src/app/services/helper.service";
import { Cities } from "src/app/Models/cities";
@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.css"]
})
export class AddressFormComponent implements OnInit {
  @Output() addSave = new EventEmitter<boolean>();
  constructor(
    // public activeModal: NgbActiveModal,
    private custService: CustomerService,
    private _validator: ValidatorsService,
    private helper: HelperService
  ) {}
  userAddress = "";
  userPhone = "";
  selState: any;
  city = "";
  state = "";
  postalCode = "";
  contactPerson = "";
  displaySaveButton = true;
  invalidMobile = false;
  invalidCity = false;
  invalidState = false;
  invalidPostalCode = false;
  isEdit = false;
  statesData: Array<Cities>;
  distinctStates: Array<Cities>;
  filteredCities: Array<Cities>;
  addressRequest: AddressRequest;
  @Input() editAddress;
  @Input() formName;
  ngOnInit(): void {
    debugger;
    this.addressRequest = new AddressRequest();
    this.helper.getStates().subscribe(
      data => {
        this.distinctStates = data.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.stateId === thing.stateId)) === i;
        });

        this.statesData = data;

        this.filterDistricts(this.editAddress.state);
        console.log(data);
      },
      err => {}
    );
    debugger;
    if (this.editAddress != null && this.editAddress != undefined) {
      this.userAddress = this.editAddress.address;
      this.userPhone = this.editAddress.phoneNumber;
      this.contactPerson = this.editAddress.userName;
      this.state = this.editAddress.state;
      this.city = this.editAddress.city;
      this.postalCode = this.editAddress.postalCode;
      this.addressRequest.AddressId = this.editAddress.addId;
      this.addressRequest.address = this.editAddress.address;
      this.addressRequest.lattitude = this.editAddress.lat;
      this.addressRequest.longitude = this.editAddress.lon;
    }
  }
  filterDistricts(stateId) {
    debugger;
    let sValue = stateId.split(":");
    if (sValue.length > 1) {
      sValue = sValue[1].trim();
    } else {
      sValue = stateId;
    }
    try {
      this.filteredCities = this.statesData.filter(
        item => item.stateName == sValue
      );
      this.isEdit = false;
      console.log(this.filteredCities);
    } catch {}
  }
  getAddress(place: any) {
    console.log(place);
    this.userAddress = place["formatted_address"];
    this.addressRequest.address = place["formatted_address"];
    this.addressRequest.lattitude = place.geometry.location.lat();
    this.addressRequest.longitude = place.geometry.location.lng();

    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
    this.displaySaveButton = false;
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
      this.displaySaveButton = false;
    }
  }
  Back() {
    this.addSave.emit(false);
  }
  saveAddress() {
    debugger;
    if (
      this.userAddress == "" ||
      this.userPhone == "" ||
      this.contactPerson == "" ||
      this.invalidMobile == true ||
      this.state == "" ||
      this.city == "" ||
      this.postalCode == ""
    ) {
      alert("Please enter correct values for fields");
      return;
    }
    this.addressRequest.userId = localStorage.getItem("userId");
    this.addressRequest.phoneNumber = this.userPhone;
    this.addressRequest.userName = this.contactPerson;
    this.displaySaveButton = true;
    this.addressRequest.city = this.city;
    this.addressRequest.state = this.state;
    this.addressRequest.postalCode = this.postalCode;
    this.custService.updateAddressRequest(this.addressRequest).subscribe(
      data => {
        console.log(data);
        alert("Address saved successfully");
        this.addSave.emit(true);
        //this.activeModal.close("closed");
      },
      err => {
        this.displaySaveButton = false;
        alert("Issue in saving address.Please try again");
        this.addSave.emit(false);
        console.log(err);
      }
    );
  }
}
