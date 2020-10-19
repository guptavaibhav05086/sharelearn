import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "../../services/admin.service";
@Component({
  selector: "app-view-designer-profile",
  templateUrl: "./view-designer-profile.component.html",
  styleUrls: ["./view-designer-profile.component.css"]
})
export class ViewDesignerProfileComponent implements OnInit {
  @Input() profile;
  IsProfDesi: boolean = false;
  verifyDes: boolean = false;
  constructor(public activeModal: NgbActiveModal, public admin: AdminService) {}

  ngOnInit(): void {
    debugger;
    this.IsProfDesi = this.profile.isVerified;
    this.verifyDes = this.profile.isProfessional;
    console.log(this.profile);
  }
  approveProfile() {
    this.admin
      .adminVerifyVendor(
        "Designer",
        this.profile.emailId,
        this.IsProfDesi,
        this.verifyDes
      )
      .subscribe(data => {
        if (data == true) {
          alert("Deatils Updated in system");
        } else {
          alert("Issue in Deatils Updating.Please contact the admin");
        }
      });
  }
}
