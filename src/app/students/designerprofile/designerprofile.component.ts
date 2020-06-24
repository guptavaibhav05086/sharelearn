import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TermsconditionsComponent } from "../termsconditions/termsconditions.component";
import { VerifyOTPComponent } from "../verify-otp/verify-otp.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-designerprofile",
  templateUrl: "./designerprofile.component.html",
  styleUrls: ["./designerprofile.component.css"]
})
export class DesignerprofileComponent implements OnInit {
  isDisabled: boolean = false;
  isDisableProfession: boolean = false;
  profileform = new FormGroup({
    fName: new FormControl("", [Validators.required]),
    lName: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    mobileNumber: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    qualification: new FormControl("", [Validators.required]),
    exp: new FormControl("", [Validators.required]),
    profile: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    postalCode: new FormControl("", [Validators.required])
  });
  profileformdemo = new FormGroup({
    fName: new FormControl("", [Validators.required]),
    lName: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required])
  });
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
  editForm(formname) {
    debugger;
    let check = this.profileformdemo.controls["fName"].value;
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
}
