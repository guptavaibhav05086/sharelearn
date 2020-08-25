import { Component, OnInit, HostListener } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-book-meeting",
  templateUrl: "./book-meeting.component.html",
  styleUrls: ["./book-meeting.component.css"]
})
export class BookMeetingComponent implements OnInit {
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  model: NgbDateStruct;
  meetingInfo: any;
  time: NgbTimeStruct;
  timeTill: NgbTimeStruct;
  hourStep = 1;
  minuteStep = 30;
  secondStep = 30;
  slotsData = {
    starHours: 10
  };
  initialDate = {
    year: 0,
    month: 0,
    day: 0
  };
  productform = new FormGroup({
    meetingDate: new FormControl({}),
    meetingTill: new FormControl(""),
    meetingSlot: new FormControl("", (control: FormControl) => {
      //debugger;
      const value = control.value;
      if (
        this.initialDate != undefined &&
        this.model != undefined &&
        this.model.day == this.initialDate.day &&
        this.model.month == this.initialDate.month
      ) {
        if (value.hour < this.slotsData.starHours) {
          return { beforeTimegap: true };
        }
      }
      if (!value) {
        return null;
      }

      if (value.hour < 10) {
        return { tooEarly: true };
      }
      if (value.hour > 22) {
        return { tooLate: true };
      }

      return null;
    })
  });
  constructor(
    public activeModal: NgbActiveModal,
    private custService: CustomerService
  ) {}

  ngOnInit(): void {
    //debugger;
    this.meetingInfo = this.checkTimeGap();
    let date = new Date();
    date.setHours(date.getHours() + this.meetingInfo.gap);
    this.slotsData.starHours = date.getHours() + 1;
    if (this.slotsData.starHours > 22 || this.slotsData.starHours < 10) {
      this.slotsData.starHours = 10;
    }
    //this.time.hour = this.slotsData.starHours;
    this.time = {
      hour: this.slotsData.starHours,
      minute: 0,
      second: 0
    };
    this.timeTill = {
      hour: this.slotsData.starHours,
      minute: 0,
      second: 0
    };
    this.initialDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getUTCDate()
    };
    this.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getUTCDate() + 1
    };
    this.minDate = this.initialDate;
    this.model = this.initialDate;
    this.productform.patchValue({
      meetingDate: this.initialDate,
      meetingSlot: this.time,
      meetingTill: this.timeTill
    });
  }
  @HostListener("window:popstate", ["$event"])
  onPopState(event) {
    debugger;
    console.log("Back button pressed");
    this.activeModal.close();
  }
  checkTimeGap() {
    debugger;
    let cartList = this.custService.getLocalStorageCart();
    let calGap = 0;
    let meetingDuration = 0;
    if (cartList != null) {
      cartList.forEach(item => {
        if (item.type != "Print Only") {
          let mD = item.category[0].meetingDetails;
          calGap = calGap + mD.timeGap;
          meetingDuration = meetingDuration + mD.meetingDuration;
        }
      });
    }

    // if(calGap > maxGap){
    //   alert("This Item can not be added to Cart because of meeting slot time constraints");
    //   return false
    // }
    return { gap: calGap, duration: meetingDuration };
  }
  calculateSlots(avaDate) {}

  dateControlValidation() {
    debugger;
  }
  validateDate() {
    //debugger;
    //let val = this.productform.controls["meetingSlot"].value.minute;
    this.time.minute = 30;
    this.productform.patchValue({
      meetingSlot: this.time
    });

    alert(
      "Slots are only avaliable as the intreval of 30 mins.Please use button only to choose the slot"
    );
  }
  slot() {
    let meetingDetails = {
      mDate: this.model,
      mSlot: this.productform.controls["meetingSlot"].value,
      duration: this.meetingInfo.duration
    };
    this.activeModal.close(meetingDetails);
    // this.activeModal.close(this.productform.controls['meetingSlot'].value);
  }
}
