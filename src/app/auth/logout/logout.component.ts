import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { HelperService } from "../../services/helper.service";
@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(private _login: LoginService, private _helper: HelperService) {}

  ngOnInit(): void {
    this._login.resetToken();
    this._helper.navigateToPath("/");
  }
}
