import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-navbaruser",
  templateUrl: "./navbaruser.component.html",
  styleUrls: ["./navbaruser.component.css"]
})
export class NavbaruserComponent implements OnInit {
  username;
  constructor(private login: LoginService, private helper: HelperService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("email");
  }
  navigateprofile(event) {
    event.preventDefault();
    let token = this.login.getUserToken();
    if (token.type == "Printer") {
      this.helper.navigateToPath("/printers/profile");
    }
    if (token.type == "Designer") {
      this.helper.navigateToPath("/designer/designerprofile");
    }
  }
}
