import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditConfigsComponent } from "../edit-configs/edit-configs.component";
@Component({
  selector: "app-configs",
  templateUrl: "./configs.component.html",
  styleUrls: ["./configs.component.css"]
})
export class ConfigsComponent implements OnInit {
  configValue: any;
  constructor(private service: AdminService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.service.getConfig().subscribe(
      data => {
        console.log(data);
        this.configValue = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  openModal(config, type) {
    let modelRef = this.modalService.open(EditConfigsComponent);
    modelRef.componentInstance.config = config;
    modelRef.componentInstance.type = type;
  }
}
