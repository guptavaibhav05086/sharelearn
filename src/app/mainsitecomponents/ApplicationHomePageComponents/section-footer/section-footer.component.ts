import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
import { CustomerService } from "src/app/services/customer.service";
@Component({
  selector: "app-section-footer",
  templateUrl: "./section-footer.component.html",
  styleUrls: ["./section-footer.component.css"]
})
export class SectionFooterComponent implements OnInit {
  constructor(private helper: HelperService, private cust: CustomerService) {}
  userEmail = "";
  ngOnInit(): void {}
  navigateToProduct(prodName, e) {
    e.preventDefault();
    let params = { selectedProduct: prodName };
    this.helper.navigateToPathWithparams("/createorder", {
      queryParams: params
    });
  }
  navigateTopath(path, e) {
    e.preventDefault();

    this.helper.navigateToPath(path);
  }
  SentEmail() {
    debugger;
    var patt = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    );
    var res = patt.test(this.userEmail);
    if (res) {
      this.cust.InviteFriend(this.userEmail).subscribe(data => {
        alert("User is Invited.");
        this.userEmail="";
      });
    } else {
      alert("Invalid Email Id");
    }
  }
}
