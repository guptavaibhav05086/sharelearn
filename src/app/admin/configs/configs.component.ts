import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditConfigsComponent } from "../edit-configs/edit-configs.component";
import { LoginService } from "src/app/services/login.service";
import { HelperService } from "src/app/services/helper.service";
@Component({
  selector: "app-configs",
  templateUrl: "./configs.component.html",
  styleUrls: ["./configs.component.css"]
})
export class ConfigsComponent implements OnInit {
  configValue: any;
  pinCodeList: any;
  constructor(
    private service: AdminService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private helperServive: HelperService
  ) {}

  ngOnInit(): void {
    if (this.loginService.checkSupportRole()) {
      this.helperServive.navigateToPath("/admin/orders");
    }
    this.service.getConfig().subscribe(
      data => {
        console.log(data);
        this.configValue = data;
      },
      err => {
        console.log(err);
      }
    );
    this.service.getPinCodes().subscribe(data => {
      this.pinCodeList = data;
    });
  }
  openModal(config, type) {
    let modelRef = this.modalService.open(EditConfigsComponent);
    modelRef.componentInstance.config = config;
    modelRef.componentInstance.type = type;
    modelRef.result.then(data => {
      this.pinCodeList = data;
      window.location.reload();
    });
  }
  DeletePinCode(pin) {
    let res = confirm("Do you want to delete the Pin code: " + pin);
    if (res) {
      this.service.deletePinCodes(pin).subscribe(data => {
        this.configValue = data;
        window.location.reload();
      });
    }
  }
}
