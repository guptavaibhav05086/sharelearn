import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../services/helper.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ValidatorsService } from "../../services/validators.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: [
    "./register.component.css",
    "../../../assets/DashBoard/css/style.css",
    "../../../assets/DashBoard/css/theme.css"
  ]
})
export class RegisterComponent implements OnInit {
  constructor(
    private _helper: HelperService,
    private _validator: ValidatorsService
  ) {}

  ngOnInit() {}
}
