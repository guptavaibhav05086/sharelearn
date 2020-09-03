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
import { RegisterService } from "src/app/services/register.service";
@Component({
  selector: "app-designerprofile",
  templateUrl: "./designerprofile.component.html",
  styleUrls: ["./designerprofile.component.css"]
})
export class DesignerprofileComponent implements OnInit {
  isDisabled: boolean = false;
  isDisableProfession: boolean = false;
  request: DesignerProfileRequest;
  isPhotoUrlValid: boolean;
  isTermsAccepted: boolean = false;
  displayOthers = false;
  isEdit = false;
  isPhoneVerified = false;
  verifyClicked = false;
  displayControls=false;
  profileform = new FormGroup({
    fName: new FormControl("", [Validators.required]),
    lName: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    mobileNumber: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
      )
    ]),
    dob: new FormControl("", [Validators.required]),
    // qualification: new FormControl("", [
    //   Validators.required,
    //   this._validator.patternValidation(/^\d{4}\d{4}\d{4}$/)
    // ]),
    exp: new FormControl("", [Validators.required]),
    profile: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    postalCode: new FormControl("", [Validators.required]),
    softwares: new FormArray([]),
    others: new FormControl("", []),
    // pan: new FormControl("", [
    //   Validators.required,
    //   this._validator.patternValidation(
    //     /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
    //   )
    // ])
  });
  oldNumber: any;
  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    private designer: DesignerService,
    private _validator: ValidatorsService,
    private spinnerService: NgxSpinnerService,
    private register: RegisterService
  ) {}
  statesData: Array<Cities>;
  distinctStates: Array<Cities>;
  filteredCities: Array<Cities>;
  softwares = [
    {
      id: 1,
      name: "ADOBE PHOTOSHOP",
      selected: false
    },
    {
      id: 2,
      name: "ADOBE ILLUSTRTOR",
      selected: false
    },
    {
      id: 3,
      name: "CORAL DRAW",
      selected: false
    },
    {
      id: 4,
      name: "INDESIGN",
      selected: false
    },
    {
      id: 5,
      name: "Others (please specify)",
      selected: false
    }
  ];
  profileImg = "../../../assets/StudentDashboard/img/avatar.jpg";
  ngOnInit() {
    this.helper.getStates().subscribe(
      data => {
        this.distinctStates = data.filter((thing, i, arr) => {
          return arr.indexOf(arr.find(t => t.stateId === thing.stateId)) === i;
        });

        this.statesData = data;
        this.filterDistricts(this.profileform.controls["state"].value);

        //console.log(data);
      },
      err => {}
    );
    let userId = localStorage.getItem("userId");
    if (userId != null && userId != undefined) {
      this.designer.getProfile(userId).subscribe(
        data => {
          debugger;
          //console.log(data);

          this.profileform.patchValue({
            fName: data["firstName"],
            lName: data["lastName"],
            gender: data["gender"],
            mobileNumber: data["mobileNumber"],
            dob: data["dob"],
            profile: data["profileUrl"],
            address: data["address"],
            //qualification: data["qualification"],
            exp: data["exp"],
            postalCode: data["postalCode"],
            state: data["state"],
            city: data["city"],
            //pan: data["pan"]
          });
          if (data["mobileNumber"] != null && data["mobileNumber"] != "") {
            this.isPhoneVerified = data["isMobileVerified"];
            this.profileform.get("mobileNumber").disable();
            this.oldNumber = this.profileform.controls["mobileNumber"].value;
          }

          if (data["profileImage"] != null) {
            this.profileImg = data["profileImage"];
          }
          this.filterDistricts(data["state"]);
          this.isEdit = true;

          console.log(this.profileform);

          let softwaresList = data["softwares"].split(";");
          for (let i = 0; i < softwaresList.length; i++) {
            let sel = this.softwares.filter(
              item => item.name == softwaresList[i]
            );
            if (sel.length > 0) {
              sel[0].selected = true;
              if (sel[0].name == "Others (please specify)") {
                this.displayOthers = true;
              }
            }

            if (softwaresList[i].includes("others-")) {
              let soft = softwaresList[i].split("-")[1];
              this.profileform.patchValue({
                others: soft
              });
            }
          }
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
  selectedSoftware(name, event) {
    debugger;
    console.log(event);
    if (name == "Others (please specify)") {
      if (event.target.checked) this.displayOthers = true;
      // if (this.displayOthers) this.displayOthers = false;
      else this.displayOthers = false;
    }
    let item = this.softwares.filter(item => item.name == name);
    if (item[0].selected) {
      item[0].selected = false;
    } else {
      item[0].selected = true;
    }
  }
  filterDistricts(stateId) {
    debugger;
    try {
      this.filteredCities = this.statesData.filter(
        item => item.stateName == stateId
      );
      this.isEdit = false;
      console.log(this.filteredCities);
    } catch {}
  }
  createProfile() {
    if (
      !(this.profileform.valid && this.isTermsAccepted && this.isPhoneVerified)
    ) {
      let invalidControls = "";
      Object.keys(this.profileform.controls).forEach(field => {
        // {1}
        const control = this.profileform.get(field); // {2}
        if (control.status.toLowerCase() == "invalid") {
          if(field=="qualification"){
            invalidControls = invalidControls + " [ Aadhar ] ";
          }
          else{
            invalidControls = invalidControls + " [" + field.toUpperCase() + " ] ";
          }
          
        }
        control.markAsTouched({ onlySelf: true }); // {3}
      });
      if (!this.isPhoneVerified) {
        alert("Phone Number is not verified");
        return;
      } else if (!this.isTermsAccepted) {
        alert("Accept Terms and Conditions");
      } else {
        alert(
          `Please provide correct value in these controls ${invalidControls}`
        );
      }
      return;
    }
    this.request = new DesignerProfileRequest();
    this.request.softwares = "";
    this.request.firstName = this.profileform.controls["fName"].value;
    this.request.lastName = this.profileform.controls["lName"].value;
    this.request.gender = this.profileform.controls["gender"].value;
    this.request.postalCode = this.profileform.controls["postalCode"].value;
    this.request.profileUrl = this.profileform.controls["profile"].value;
    // this.request.qualification = this.profileform.controls[
    //   "qualification"
    // ].value;
    this.request.mobileNumber = this.profileform.controls["mobileNumber"].value;
    this.request.dob = this.profileform.controls["dob"].value;
    this.request.exp = this.profileform.controls["exp"].value;
    this.request.city = this.profileform.controls["city"].value;
    this.request.state = this.profileform.controls["state"].value;
    this.request.userId = localStorage.getItem("userId");
    this.request.emailId = localStorage.getItem("email");
    //this.request.pan = this.profileform.controls["pan"].value;
    let selSoft = this.softwares.filter(item => item.selected == true);
    selSoft.forEach(item => (this.request.softwares += item.name + ";"));

    if (
      this.profileform.controls["others"].value != null &&
      this.profileform.controls["others"].value != ""
    ) {
      this.request.softwares =
        this.request.softwares +
        "others-" +
        this.profileform.controls["others"].value;
    }

    this.spinnerService.show();
    this.designer.updateProfileRequest(this.request).subscribe(
      data => {
        this.spinnerService.hide();
        console.log(data);
        alert(
          "Thank You for registering with us. You will be informed shortly"
        );
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
        alert("Issue occured during registration.Please contact the admin");
      }
    );

    console.log(this.request);
    //this.request.gender=this.profileform.controls["gender"].value;
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
  changeNumber() {
    debugger;
    this.isPhoneVerified = false;
    this.profileform.get("mobileNumber").enable();
    // //this.oldNumber=this.profileform.controls['mobileNumber'].value;
    // if (this.oldNumber != this.profileform.controls["mobileNumber"].value) {
    //   this.isPhoneVerified = false;
    //   this.profileform.get("mobileNumber").disable();
    // } else {
    //   this.isPhoneVerified = true;
    //   this.profileform.get("mobileNumber").enable();
    // }
    // if (!this.verifyClicked) {
    //   this.profileform.get("mobileNumber").enable();
    // }
  }
  openVerifyOTP() {
    if (this.isPhoneVerified == false) {
      this.verifyClicked = true;
      let result = this.generateOTP();
      if (result) {
        const modalRef = this.modalService.open(VerifyOTPComponent, {
          backdrop: "static"
        });
        modalRef.componentInstance.name = "World";
        modalRef.componentInstance.number = this.profileform.controls[
          "mobileNumber"
        ].value;
        modalRef.result.then(result => {
          debugger;
          if (result) {
            this.isPhoneVerified = result;
            this.profileform.get("mobileNumber").disable();
          } else {
            this.isPhoneVerified = result;
            this.profileform.get("mobileNumber").enable();
          }
          console.log(this.profileform);
          console.log(this.isPhoneVerified);
          console.log(this.isTermsAccepted);
        });
      }
    }
  }
  generateOTP() {
    debugger;
    let number = this.profileform.controls["mobileNumber"].value;
    //this.message = "";
    //this.spinner.show();
    let userId = localStorage.getItem("userId");
    // let number =  this.studentForm.controls['mobileNumber'].value;
    if (
      this.profileform.controls["mobileNumber"].value != "" &&
      !this.profileform.controls["mobileNumber"].invalid
    ) {
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
    } else {
      alert("Enter Valid Mobile Number");
      return false;
    }
    return true;
  }
  openTermCondition(event) {
    event.preventDefault();
    //this.modalService.open(longContent, { scrollable: true });
    const modalRef = this.modalService.open(TermsconditionsComponent, {
      scrollable: true
    });
    modalRef.componentInstance.name = "terms conditions";
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
    this.designer.uploadUserImage(formData).subscribe(
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

    return true;
  }
}
