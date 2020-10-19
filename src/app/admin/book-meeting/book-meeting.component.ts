import { Component, OnInit, Input,HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: 'app-book-meeting',
  templateUrl: './book-meeting.component.html',
  styleUrls: ['./book-meeting.component.css']
})
export class BookMeetingComponent implements OnInit {

  @Input() comingFromOrderPage=false;
  @Input() gapDetails;
  minDatecontrol: any;
  maxDatecontrol: any;
  meetingSlotBookingTimeStart = {
    day: 0,
    month: 0,
    year: 0,
    hour: 0,
    minute: 0,
    second: 0
  };

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  model: NgbDateStruct;

  meetingInfo: any;
  time: NgbTimeStruct;
  // timeTill: NgbTimeStruct;
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
    meetingDateContol: new FormControl(),
    meetingTill: new FormControl(""),
    meetingSlot: new FormControl("", (control: FormControl) => {
      //debugger;
      const value = control.value;
      if (
        this.meetingSlotBookingTimeStart != undefined &&
        this.checkSelectedDateIsTodaysDate() == true
      ) {
        if (value.hour < this.meetingSlotBookingTimeStart.hour) {
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
    this.time = {
      hour: 0,
      minute: 0,
      second: 0
    };
    if(this.comingFromOrderPage){
      this.meetingInfo = this.gapDetails;
    }
    else{
      this.meetingInfo = this.checkTimeGap();
    }
   
    this.calculateSlots();
    let date = new Date();
    // date.setHours(date.getHours() + this.meetingInfo.gap);
    // this.slotsData.starHours = date.getHours() + 1;
    // if (this.slotsData.starHours > 22 || this.slotsData.starHours < 10) {
    //   this.slotsData.starHours = 10;
    // }
    //this.time.hour = this.slotsData.starHours;

    // this.timeTill = {
    //   hour: this.slotsData.starHours,
    //   minute: 0,
    //   second: 0
    // };
    // this.initialDate = {
    //   year: date.getFullYear(),
    //   month: date.getMonth() + 1,
    //   day: date.getDate()
    // };
    this.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate() + 1
    };
    // this.minDatecontrol = this.convertDate(this.initialDate);
    // this.maxDatecontrol = this.convertDate(this.maxDate);
    this.minDate = this.initialDate;
    this.model = this.initialDate;
    this.productform.patchValue({
      meetingDate: this.initialDate,
      meetingSlot: this.time
    });
  }
  @HostListener("window:popstate", ["$event"])
  onPopState(event) {
    debugger;
    console.log("Back button pressed");
    this.activeModal.close();
  }
  checkTimeGap() {
    //debugger;
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
    return { gap: calGap, duration: meetingDuration };
  }
  calculateSlots() {
  debugger;
    var date = new Date();
    let gap = this.meetingInfo.gap;
    let gapTobeAddedInNextWrkingDay = gap;
    let currentTime = new Date().getHours();
    let remainingWorkingHoursInDay = 0;
    if (currentTime >= 10 && currentTime <= 22) {
      remainingWorkingHoursInDay = 22 - (currentTime + 1);
      if (gap > remainingWorkingHoursInDay) {
        gapTobeAddedInNextWrkingDay = gap - remainingWorkingHoursInDay;
      } else {
        this.meetingSlotBookingTimeStart.day = new Date().getDate();
        this.meetingSlotBookingTimeStart.month = new Date().getMonth() + 1;
        this.meetingSlotBookingTimeStart.year = new Date().getFullYear();
        this.meetingSlotBookingTimeStart.hour = currentTime + gap;
        this.setSlots(this.meetingSlotBookingTimeStart);
        this.productform.patchValue({
          meetingDateContol: this.convertDate(this.meetingSlotBookingTimeStart)
        });
        return;
      }
    }

    if (
      (currentTime >= 0 && currentTime <= 10) ||
      (currentTime >= 22 && currentTime <= 24)
    ) {
      if (currentTime >= 22 && currentTime <= 24) {
        this.settIntialMeetingDetailsForSameDay(gapTobeAddedInNextWrkingDay);
      } else {
        let initialDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          10
        );
        initialDate.setHours(
          initialDate.getHours() + gapTobeAddedInNextWrkingDay
        );
        this.meetingSlotBookingTimeStart.day = initialDate.getDate();
        this.meetingSlotBookingTimeStart.month = initialDate.getMonth() + 1;
        this.meetingSlotBookingTimeStart.year = initialDate.getFullYear();
        this.meetingSlotBookingTimeStart.hour = initialDate.getHours();
        if (
          this.meetingSlotBookingTimeStart.hour < 10 ||
          (this.meetingSlotBookingTimeStart.hour >= 22 &&
            this.meetingSlotBookingTimeStart.hour <= 24)
        ) {
          this.meetingSlotBookingTimeStart.hour = 10;
        }
        this.setSlots(this.meetingSlotBookingTimeStart);
      }
    } else {
      this.settIntialMeetingDetailsForSameDay(gapTobeAddedInNextWrkingDay);
    }
    debugger;
    this.productform.patchValue({
      meetingDateContol: this.convertDate(this.meetingSlotBookingTimeStart)
    });
    
  }
  settIntialMeetingDetailsForSameDay(gapTobeAddedInNextWrkingDay) {
    let date = new Date();
    let initialDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
      10
    );
    initialDate.setHours(initialDate.getHours() + gapTobeAddedInNextWrkingDay);
    this.meetingSlotBookingTimeStart.day = initialDate.getDate();
    this.meetingSlotBookingTimeStart.month = initialDate.getMonth() + 1;
    this.meetingSlotBookingTimeStart.year = initialDate.getFullYear();
    this.meetingSlotBookingTimeStart.hour = initialDate.getHours();
    if (
      this.meetingSlotBookingTimeStart.hour < 10 ||
      (this.meetingSlotBookingTimeStart.hour >= 22 &&
        this.meetingSlotBookingTimeStart.hour <= 24)
    ) {
      this.meetingSlotBookingTimeStart.hour = 10;
    }
    this.setSlots(this.meetingSlotBookingTimeStart);
  }
  setSlots(date) {
    this.minDatecontrol = this.convertDate(date);
    let maxDate = {
      day: date.day + 1,
      month: date.month,
      year: date.year
    };
    this.maxDatecontrol = this.convertDate(maxDate);
    this.time.hour = this.meetingSlotBookingTimeStart.hour;
    this.productform.patchValue({
      meetingSlot: this.time.hour
    });
  }
  dateControlValidation() {
    //debugger;
    if (this.checkSelectedDateIsTodaysDate() == true) {
      this.time.hour = this.meetingSlotBookingTimeStart.hour;
      this.productform.patchValue({
        meetingSlot: this.time
      });
    } else {
      this.productform.patchValue({
        meetingSlot: this.time
      });
    }
  }
  checkSelectedDateIsTodaysDate() {
    try {
      let selectedDate = this.productform.controls["meetingDateContol"].value;
      let d = new Date(selectedDate);

      if (d.getDate() == this.meetingSlotBookingTimeStart.day) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
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
    if (this.checkSelectedDateIsTodaysDate() == true) {
      let selMeetingSlot = this.productform.controls["meetingSlot"].value;
      if (selMeetingSlot.hours < this.meetingSlotBookingTimeStart.hour) {
        alert(
          `Slots are avaliable only after ${this.meetingSlotBookingTimeStart.hour} for date ${this.meetingSlotBookingTimeStart.day}`
        );
      }
    }
  }
  slot() {
    //debugger;
    if (this.productform.controls["meetingSlot"].status == "INVALID") {
      alert("Please choose the valid slot to proceed");
      return;
    }
    console.log(this.productform.controls["meetingSlot"].errors);
    let selectedDate = new Date(
      this.productform.controls["meetingDateContol"].value
    );

    let selModel = {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth()+1,
      year: selectedDate.getFullYear()
    };
    let meetingDetails = {
      mDate: selModel,
      mSlot: this.productform.controls["meetingSlot"].value,
      duration: this.meetingInfo.duration
    };
    this.activeModal.close(meetingDetails);
    // this.activeModal.close(this.productform.controls['meetingSlot'].value);
  }
  convertDate(date: any) {
    //debugger;
    let validDate = `${date.year}-${
      date.month < 10 ? "0" + date.month : date.month
    }-${date.day < 10 ? "0" + date.day : date.day}`;
    return validDate;
  }

}
