import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { HelperService } from "../../services/helper.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";
import { LoginService } from "../../services/login.service";
import { RegisterService } from "../../services/register.service";
import { RegisterUser } from "../../Models/register-user";
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from "rxjs/operators";
import { TokenRequest } from "src/app/Models/token-request";
import { GusetRegister } from "src/app/Models/guset-register";
@Component({
  selector: "app-registercours",
  templateUrl: "./registercours.component.html",
  styleUrls: ["./registercours.component.css"]
})
export class RegistercoursComponent implements OnInit {
  selectedCourse: string;
  selectedTopic: string = "";
  displayGuestForm: boolean = false;
  displayForm: boolean;
  imageUrl: string = "../../../assets/img/";
  feesDetails = {
    fees: 0,
    discount: 0,
    GST: 0,
    totalFees: 0,
    netTotal: 0,
    disPer: 0
  };
  constructor(
    private _helper: HelperService,
    private router: Router,
    private route: ActivatedRoute,
    private _validator: ValidatorsService,
    private _login: LoginService,
    private spinnerService: NgxSpinnerService,
    private _register: RegisterService
  ) {}

  ngOnInit() {
    debugger;
    let courseid = this.route.snapshot.queryParams["course"];
    let topicId = this.route.snapshot.queryParams["topic"];
    this.getCourseTopicDetails(courseid, topicId);
    let token = this._login.getUserToken();
    if ((token.Token != null || token.Token != "") && token.type == "Student") {
      this.displayForm = false;
    } else {
      this.displayForm = true;
    }
  }
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
    ]),
    mobileNumber: new FormControl("", [
      Validators.required,
      this._validator.patternValidation(
        /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
      )
    ])
  });
  showForm(e) {
    e.preventDefault();
    this.displayGuestForm = true;
  }
  registerGuest() {
    this.spinnerService.show();
    let loginRequest = new GusetRegister();
    loginRequest.Email = this.loginForm.controls["email"].value;
    loginRequest.PhoneNumber = this.loginForm.controls["mobileNumber"].value;
    this._register.guestRegister(loginRequest).subscribe(
      data => {
        this.spinnerService.hide();
        console.log(data);
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
      }
    );
  }
  getCourseTopicDetails(courseId, topicid) {
    debugger;
    let courseList = this._helper.getCourseList();
    let topicList = this._helper.getTopicList();
    let courseName = courseList.filter(item => item.courseId == courseId);
    let topicName = topicList.filter(
      item => item.courseId == courseId && item.topicId == topicid
    );
    if (topicid == 0) {
      this.selectedTopic = "Bundled Course (Full)";
      this.calculateFees(courseName[0].courseFees);
    } else if (topicName != null) {
      this.selectedTopic = topicName[0].topicName;
      this.calculateFees(topicName[0].fees);
    }
    if (courseName != null) {
      this.selectedCourse = courseName[0].courseName;
      this.imageUrl = this.imageUrl + courseName[0].imageName;
    }
  }

  calculateFees(basicFees: number) {
    let disPer = this._helper.getDiscountPercentage();
    this.feesDetails.disPer = disPer;
    this.feesDetails.fees = basicFees;
    this.feesDetails.discount = basicFees * (disPer / 100);
    this.feesDetails.GST = basicFees * (this._helper.getGSTRate() / 100);
    this.feesDetails.totalFees = basicFees - this.feesDetails.discount;
    this.feesDetails.netTotal =
      this.feesDetails.totalFees + this.feesDetails.GST;
  }
}
