import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-view-printer-profile",
  templateUrl: "./view-printer-profile.component.html",
  styleUrls: ["./view-printer-profile.component.css"]
})
export class ViewPrinterProfileComponent implements OnInit {
  @Input() profile;
  IsProfDesi: boolean = false;
  verifyDes: boolean = false;
  constructor(public activeModal: NgbActiveModal, public admin: AdminService) {}

  ngOnInit(): void {
    debugger;
    //this.IsProfDesi=this.profile.isVerified;
    this.verifyDes = this.profile.isProfessional;
    console.log(this.profile);
  }
  approveProfile() {
    this.admin
      .adminVerifyVendor(
        "Printer",
        this.profile.email,
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
  downloadFiles(filename) {
    this.admin.getFiles(filename, "userkycdata").subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      err => {
        console.log(err);
      }
    );
  }
}
