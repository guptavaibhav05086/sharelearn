import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddressFormComponent } from "../address-form/address-form.component";
import { CustomerService } from "src/app/services/customer.service";
import { AddressRequest } from "src/app/Models/address-request";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-select-address",
  templateUrl: "./select-address.component.html",
  styleUrls: ["./select-address.component.css"]
})
export class SelectAddressComponent implements OnInit {
  addressList: Array<AddressRequest>;
  displayAddressList = [];
  constructor(
    private modalService: NgbModal,
    private custService: CustomerService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.addressList = new Array<AddressRequest>();
    this.fetchAddress();
  }
  fetchAddress() {
    let userId = "5541713c-e1b5-4ed4-9e36-a92f0eab91d3";
    this.spinnerService.show();
    this.custService.getUserAddress(userId).subscribe(
      data => {
        this.spinnerService.hide();
        this.formatAddressResponse(data);
      },
      err => {
        this.spinnerService.hide();
        alert("Error in getting address list");
      }
    );
  }

  formatAddressResponse(data) {
    debugger;
    this.addressList = data;
    if (this.addressList.length == 0) {
      alert("No address found for the user");
    }
    this.displayAddressList = [];
    for (let i = 0; i < this.addressList.length; i++) {
      if (this.addressList[i].address != null) {
        var disList = this.addressList[i].address.split(",");
      }

      let item = {
        addId: this.addressList[i].AddressId,
        address: this.addressList[i].address,
        breakUp: disList,
        userName: this.addressList[i].userName,
        phoneNumber: this.addressList[i].phoneNumber
      };
      this.displayAddressList.push(item);
    }
    console.log(this.displayAddressList);
  }
  editAddress(item) {
    const modalRef = this.modalService.open(AddressFormComponent, {
      backdrop: "static"
    });
    modalRef.componentInstance.editAddress = item;
    modalRef.result.then(result => {
      this.fetchAddress();
    });
  }
  deleteAddress(item) {
    var r = confirm("Press a button!");
    if (r == true) {
      let userId = "5541713c-e1b5-4ed4-9e36-a92f0eab91d3";
      this.custService.deleteUserAddress(userId, item.addId).subscribe(
        data => {
          this.formatAddressResponse(data);
        },
        err => {
          alert("error in address deletion.Contact Admin");
        }
      );
    } else {
      console.log("Presses No");
    }
    // let userId = "5541713c-e1b5-4ed4-9e36-a92f0eab91d3";
    // this.custService.deleteUserAddress(userId,item.addId).subscribe(data=>{
    //   this.formatAddressResponse(data);
    // },err=>{
    //   alert('error in address deletion.Contact Admin');
    // })
  }
  openAddressForm() {
    const modalRef = this.modalService.open(AddressFormComponent, {
      backdrop: "static"
    });
    //modalRef.componentInstance.name = "World";
    modalRef.result.then(result => {
      debugger;
      this.fetchAddress();
    });
  }
}
