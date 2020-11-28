import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "src/app/services/admin.service";
@Component({
  selector: "app-edit-configs",
  templateUrl: "./edit-configs.component.html",
  styleUrls: ["./edit-configs.component.css"]
})
export class EditConfigsComponent implements OnInit {
  @Input() config;
  @Input() type;
  constructor(
    private service: AdminService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log(this.config);
    console.log(this.type);
    if (this.config == null) {
      this.config = {
        FlagName: "",
        FlagValue: "",
        FlagId: 0
      };
    }
  }
  SaveChanges() {
    debugger;
    this.service.updateConfig(this.config).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  SavePin() {
    this.service.addPinCodes(this.config.FlagValue).subscribe(data => {
      this.activeModal.dismiss(data);
    });
  }
  Delete(id) {
    this.service.deleteConfig(id).subscribe(
      data => {
        console.log(data);
      },
      err => {}
    );
  }
}
