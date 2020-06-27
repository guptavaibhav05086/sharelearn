import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TermsconditionsComponent } from "../termsconditions/termsconditions.component";
import { VerifyOTPComponent } from "../verify-otp/verify-otp.component";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { DesignerProfileRequest } from "src/app/Models/designer-profile-request";
import { HelperService } from "../../services/helper.service";
import { Cities } from "src/app/Models/cities";
import { DesignerService } from "src/app/services/designer.service";
import { ValidatorsService } from 'src/app/services/validators.service';
import { NgxSpinnerService } from "ngx-spinner";
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
  isTermsAccepted:boolean =false;;
  profileform = new FormGroup({
    fName: new FormControl("", [Validators.required]),
    lName: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    mobileNumber: new FormControl("", [Validators.required,this._validator.patternValidation(
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    )]),
    dob: new FormControl("", [Validators.required]),
    qualification: new FormControl("", [Validators.required]),
    exp: new FormControl("", [Validators.required]),
    profile: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    postalCode: new FormControl("", [Validators.required]),
    softwares: new FormArray([])
  });
  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    private designer: DesignerService,
    private _validator: ValidatorsService,
    private spinnerService: NgxSpinnerService
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
  ngOnInit() {
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
  }
  acceptTerms(){
    debugger;
    if(this.isTermsAccepted)
    this.isTermsAccepted=false;
    else
    this.isTermsAccepted=true;
  }
  selectedSoftware(name) {
    console.log(name);
    let item = this.softwares.filter(item => item.name == name);
    if (item[0].selected) {
      item[0].selected = false;
    } else {
      item[0].selected = true;
    }
  }
  filterDistricts(stateId) {
    debugger;
    this.filteredCities = this.statesData.filter(
      item => item.stateName == stateId
    );
  }
  createProfile() {
    this.request = new DesignerProfileRequest();
    this.request.softwares = "";
    this.request.firstName = this.profileform.controls["fName"].value;
    this.request.lastName = this.profileform.controls["lName"].value;
    this.request.gender = this.profileform.controls["gender"].value;
    this.request.postalCode = this.profileform.controls["postalCode"].value;
    this.request.profileUrl = this.profileform.controls["profile"].value;
    this.request.qualification = this.profileform.controls[
      "qualification"
    ].value;
    this.request.mobileNumber = this.profileform.controls["mobileNumber"].value;
    this.request.dob = this.profileform.controls["dob"].value;
    this.request.exp = this.profileform.controls["exp"].value;
    this.request.city = this.profileform.controls["city"].value;
    this.request.state = this.profileform.controls["state"].value;
    this.request.userId = localStorage.getItem("userId");
    this.request.emailId = localStorage.getItem("email");
    let selSoft = this.softwares.filter(item => item.selected == true);
    selSoft.forEach(item => (this.request.softwares += item.name + ";"));
    this.spinnerService.show();
    this.designer.updateProfileRequest(this.request).subscribe(
      data => {
        this.spinnerService.hide();
        console.log(data);
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
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
  openVerifyOTP() {
    const modalRef = this.modalService.open(VerifyOTPComponent);
    modalRef.componentInstance.name = "World";
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
