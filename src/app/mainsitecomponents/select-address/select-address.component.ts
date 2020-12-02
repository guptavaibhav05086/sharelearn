import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddressFormComponent } from "../address-form/address-form.component";
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { AddressRequest } from "src/app/Models/address-request";
import { NgxSpinnerService } from "ngx-spinner";
import { HelperService } from "../../services/helper.service";
@Component({
  selector: "app-select-address",
  templateUrl: "./select-address.component.html",
  styleUrls: ["./select-address.component.css"]
})
export class SelectAddressComponent implements OnInit {
  addressList: Array<AddressRequest>;
  displayAddressList = [];
  addFormName = "Add Address";
  displayCreateForm = false;
  isPrintOrder: boolean;
  constructor(
    private modalService: NgbModal,
    private custService: CustomerService,
    private spinnerService: NgxSpinnerService,
    private helper: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    document.getElementsByTagName("body")[0].removeAttribute("style");
    this.addressList = new Array<AddressRequest>();
    this.route.queryParams.subscribe(params => {
      //debugger;
      console.log(params); // { order: "popular" }
      //this.cartItemId = params.itemId;
      if (params.isPrintOrder != undefined) {
        this.isPrintOrder = params.isPrintOrder;
      }

      // popular
    });
    this.fetchAddress();
  }
  fetchAddress() {
    let userId = localStorage.getItem("userId");
    this.spinnerService.show();
    this.custService.getUserAddress(userId).subscribe(
      data => {
        try {
          this.formatAddressResponse(data);
          this.spinnerService.hide();
        } catch (error) {
          this.spinnerService.hide();
        }
      },
      err => {
        this.spinnerService.hide();
        alert("Error in getting address list");
      }
    );
  }

  formatAddressResponse(data) {
    //debugger;
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
        phoneNumber: this.addressList[i].phoneNumber,
        displayForm: false,
        city: this.addressList[i].city,
        state: this.addressList[i].state,
        postalCode: this.addressList[i].postalCode,
        lat: this.addressList[i].lattitude,
        lon: this.addressList[i].longitude
      };
      this.displayAddressList.push(item);
    }
    console.log(this.displayAddressList);
  }
  addressCallBack(result, item) {
    if (item == null) {
      this.displayCreateForm = false;
    } else {
      item.displayForm = false;
    }

    if (result) {
      this.fetchAddress();
    }
  }
  editAddress(item) {
    item.displayForm = true;
    this.addFormName = "Edit Address";
    // const modalRef = this.modalService.open(AddressFormComponent, {
    //   backdrop: "static"
    // });
    // modalRef.componentInstance.editAddress = item;
    // modalRef.result.then(result => {
    //   this.fetchAddress();
    // });
  }
  deleteAddress(item) {
    var r = confirm("Press a button!");
    if (r == true) {
      //

      let userId = localStorage.getItem("userId");
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
    this.displayCreateForm = true;
    this.addFormName = "Create Address";
    // const modalRef = this.modalService.open(AddressFormComponent, {
    //   backdrop: "static"
    // });
    // //modalRef.componentInstance.name = "World";
    // modalRef.result.then(result => {
    //   //debugger;
    //   this.fetchAddress();
    // });
  }
  setAddress(item) {
    localStorage.setItem("selectedAddess", JSON.stringify(item));
    let param = { queryParams: { isPrintOrder: this.isPrintOrder } };
    this.helper.navigateToPathWithparams("/revieworder", param);
    //this.helper.navigateToPath("/revieworder");
  }
}
