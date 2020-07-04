import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TermsconditionsComponent } from "../termsconditions/termsconditions.component";
import { VerifyOTPComponent } from "../verify-otp/verify-otp.component";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { DesignerProfileRequest } from "src/app/Models/designer-profile-request";
import { HelperService } from "../../services/helper.service";
import { Cities } from "src/app/Models/cities";
import { DesignerService } from "src/app/services/designer.service";
import { ValidatorsService } from "src/app/services/validators.service";
import { NgxSpinnerService } from "ngx-spinner";
import { PrinterService } from "src/app/services/printer.service";
import {RegisterService } from '../../services/register.service';
import { PrinterProfileRequest } from "src/app/Models/printer-profile-request";
import { TransactionsuccessdetailsComponent } from "../transactionsuccessdetails/transactionsuccessdetails.component";

@Component({
  selector: "app-printerprofile",
  templateUrl: "./printerprofile.component.html",
  styleUrls: ["./printerprofile.component.css"]
})
export class PrinterprofileComponent implements OnInit {
  isDisabled: boolean = false;
  isDisableProfession: boolean = false;
  request: PrinterProfileRequest;
  isPhotoUrlValid: boolean;
  isTermsAccepted: boolean = false;
  modfyAdd: boolean = false;
  disModyBtn = false;
  fileError = false;
  selectedFileName = "Choose GST Certificate";
  profileform = new FormGroup({
    fName: new FormControl("", [Validators.required]),
    lName: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    mobileNumber: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
      )
    ]),
    dob: new FormControl("", [Validators.required]),
    gst: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
      )
    ]),

    profile: new FormControl("", [Validators.required]),
    address: new FormControl(""),
    softwares: new FormArray([])
  });
  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    private printer: PrinterService,
    private _validator: ValidatorsService,
    private spinnerService: NgxSpinnerService,
    private register:RegisterService
  ) {}
  statesData: Array<Cities>;
  distinctStates: Array<Cities>;
  filteredCities: Array<Cities>;
  softwares = [
    {
      id: 1,
      name: "Adobe Photo shop",
      selected: false
    },
    {
      id: 2,
      name: "Beyounce",
      selected: false
    },
    {
      id: 3,
      name: "New Design Software",
      selected: false
    },
    {
      id: 4,
      name: "Old Design software",
      selected: false
    },
    {
      id: 5,
      name: "Demo",
      selected: false
    },
    {
      id: 6,
      name: "Demo 2",
      selected: false
    },
    {
      id: 7,
      name: "Demo3",
      selected: false
    }
  ];
  profileImg = "../../../assets/StudentDashboard/img/avatar.jpg";
  paymentStatus(paymentStatus) {
    debugger;
    console.log(paymentStatus);
    const modelRef = this.modalService.open(TransactionsuccessdetailsComponent);
    modelRef.componentInstance.transactionId = paymentStatus.status;
    modelRef.componentInstance.transactionStatus = paymentStatus.tranId;
  }
  generateOTP() {
    debugger;
    let number = this.profileform.controls["mobileNumber"].value;
    //this.message = "";
    //this.spinner.show();
    let userId = localStorage.getItem("userId");
    // let number =  this.studentForm.controls['mobileNumber'].value;
    if(this.profileform.controls["mobileNumber"].value !="" && (!this.profileform.controls['mobileNumber'].invalid)  ){
      this.register.generateOTP(userId, number).subscribe(
        data => {
          //this.message = "Please check your email Id";
          //this.spinner.hide();
        },
        err => {
          //this.message = "Issue occured please check after some time";
          //this.spinner.hide();
        }
      );
    }
    else{
      alert('Enter Valid Mobile Number');
      return false;
    }
    return true;
    
  }
  ngOnInit() {
    this.request = new PrinterProfileRequest();
    this.helper.getStates().subscribe(
      data => {
        this.distinctStates = data.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.stateId === thing.stateId)) === i;
        });

        this.statesData = data;
        console.log(data);
      },
      err => {}
    );
    let userId = localStorage.getItem("userId");
    if (userId != null && userId != undefined) {
      this.printer.getProfile(userId).subscribe(
        data => {
          debugger;
          console.log(data);
          this.modfyAdd = true;
          this.profileform.patchValue({
            fName: data["firstName"],
            lName: data["lastName"],
            gender: data["gender"],
            mobileNumber: data["mobileNumber"],
            dob: data["dob"],
            profile: data["profileUrl"],
            address: data["address"]
          });

          if (data["profileImage"] != null) {
            this.profileImg = data["profileImage"];
          }
          console.log(this.profileform);
        },
        err => {}
      );
    }
  }
  acceptTerms() {
    debugger;
    if (this.isTermsAccepted) this.isTermsAccepted = false;
    else this.isTermsAccepted = true;
  }
  selectedSoftware(name) {
    debugger;
    console.log(name);
    let item = this.softwares.filter(item => item.name == name);
    if (item[0].selected) {
      item[0].selected = false;
    } else {
      item[0].selected = true;
    }
  }
  getAddress(place: any) {
    this.disModyBtn = true;
    console.log(place);
    this.profileform.patchValue({
      address: place["formatted_address"]
    });
    this.request.address = place["formatted_address"];
    this.request.longitude = place.geometry.location.lat();
    this.request.lattitude = place.geometry.location.lng();

    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
  }
  filterDistricts(stateId) {
    debugger;
    this.filteredCities = this.statesData.filter(
      item => item.stateName == stateId
    );
  }
  modifyAddress() {
    if (this.modfyAdd) {
      this.modfyAdd = false;
    } else {
      this.modfyAdd = true;
    }
  }
  createProfile() {
    debugger;

    //this.request.softwares = "";
    this.request.firstName = this.profileform.controls["fName"].value;
    this.request.lastName = this.profileform.controls["lName"].value;
    this.request.gender = this.profileform.controls["gender"].value;
    this.request.address = this.profileform.controls["address"].value;
    this.request.profileUrl = this.profileform.controls["profile"].value;
    this.request.gst = this.profileform.controls["gst"].value;
    //
    this.request.mobileNumber = this.profileform.controls["mobileNumber"].value;
    this.request.dob = this.profileform.controls["dob"].value;

    this.request.userId = localStorage.getItem("userId");
    this.request.emailId = localStorage.getItem("email");
    //this.request

    this.spinnerService.show();
    this.printer.updateProfileRequest(this.request).subscribe(
      data => {
        console.log(data);
        this.spinnerService.hide();
      },
      err => {
        console.log(err);
        this.spinnerService.hide();
      }
    );
  }
  editForm(formname) {
    debugger;
    // let check = this.profileform.controls["fName"].value;
    if (formname == "personal") this.isDisabled = false;
    else this.isDisableProfession = false;
  }
  updateForm(formname) {
    if (formname == "personal") this.isDisabled = true;
    else this.isDisableProfession = true;
  }
  openVerifyOTP() {
    let result = this.generateOTP();
    if(result){
      const modalRef = this.modalService.open(VerifyOTPComponent);
      modalRef.componentInstance.name = "World";
    }
    
  }
  openTermCondition(event) {
    event.preventDefault();
    //this.modalService.open(longContent, { scrollable: true });
    const modalRef = this.modalService.open(TermsconditionsComponent, {
      scrollable: true
    });
    modalRef.componentInstance.name = "terms conditions";
  }
  uploadGSTCertificate(images: FileList, name: string) {
    debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    debugger;
    for (var i = 0; (file = images[i]); i++) {
      //if the file is not an image, continue
      if (!this.validateFiles(name, file)) {
        if (!this.request.imageURL) {
          this.fileError = true;
          ///this.toast.error('File  should be an Image');
          // alert("File  should be an Image");
        } else {
          //this.toast.error('File Size should be less then 5 MB');
          alert("File Size should be less then 5 MB");
        }
        return;
      }
      let reader = new FileReader();

      reader.readAsDataURL(file);
      //this._awsupload.uploadfile(file);
    }
    formData.append("userimage", userImage, userImage.name);
    this.printer.uploadUserImage(formData).subscribe(
      data => {
        debugger;
        console.log(data);
        alert("File Uploaded Successfully");
        this.fileError = false;
        this.selectedFileName = userImage.name;
      },
      err => {
        debugger;
        this.fileError = true;
        alert("Issue in file upload please contact admin");
      }
    );
  }
  fileSelect(images: FileList, name: string) {
    debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    debugger;
    for (var i = 0; (file = images[i]); i++) {
      // if the file is not an image, continue
      if (!this.validateFiles(name, file)) {
        if (!this.request.imageURL) {
          ///this.toast.error('File  should be an Image');
          alert("File  should be an Image");
        } else {
          //this.toast.error('File Size should be less then 5 MB');
          alert("File Size should be less then 5 MB");
        }
        return;
      }
      let reader = new FileReader();
      reader.onload = (function(tFile) {
        return function(evt) {
          var div = document.createElement("div");
          div.innerHTML =
            '<img class="avatar border-gray" style="width: 110px;height:110px" src="' +
            evt.target.result +
            '" />';
          document.getElementById(name).innerHTML = "";
          document.getElementById(name).appendChild(div);
        };
      })(file);

      reader.readAsDataURL(file);
      //this._awsupload.uploadfile(file);
    }
    formData.append("userimage", userImage, userImage.name);
    this.printer.uploadUserImage(formData).subscribe(
      data => {
        debugger;
        console.log(data);
      },
      err => {
        debugger;
        console.log(err);
      }
    );
  }
  validateFiles(name: string, file: File): boolean {
    if (name == "logoInfo") {
      if (!file.type.match("image.*")) {
        this.isPhotoUrlValid = false;
        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
      if (file.size > 5000000) {
        this.isPhotoUrlValid = false;

        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
    }
    if (name == "GST") {
      if (
        !file.type.match(
          "text.*|image.*|application.pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        this.isPhotoUrlValid = false;
        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
      if (file.size > 5000000) {
        this.isPhotoUrlValid = false;

        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
    }

    return true;
  }
}
