import { Component, OnInit } from "@angular/core";
import { PrinterService } from "../../services/printer.service";
@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"]
})
export class NotificationsComponent implements OnInit {
  constructor(private printer: PrinterService) {}

  ngOnInit(): void {
    this.printer.fetchNotifications().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
