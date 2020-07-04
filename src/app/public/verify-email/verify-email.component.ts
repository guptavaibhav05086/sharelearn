import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RegisterService } from "src/app/services/register.service";
import { HelperService } from "src/app/services/helper.service";
@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private register: RegisterService,
    private _helper: HelperService
  ) {}

  ngOnInit(): void {
    debugger;
    let emailId = this.route.snapshot.queryParams["email"];
    let guid = this.route.snapshot.queryParams["guid"];
    let role = this.route.snapshot.queryParams["role"];
    this.register.VerifyEmail(emailId, guid, role).subscribe(
      data => {
        console.log(data);
        alert("Your email id is Verified");
        this._helper.navigateToPath("/login");
      },
      err => {
        console.log(err);
        alert("Verification failed.Please reach out to our support team");
        this._helper.navigateToPath("/login");
      }
    );
  }
}
