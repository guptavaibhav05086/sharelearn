import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: [
    './printers.component.css',
    "../../assets/StudentDashboard/demo/demo.css",
    "../../assets/DashBoard/css/style.css",
    "../../assets/DashBoard/css/theme.css"
]
})
export class PrintersComponent implements OnInit {
  isPrinterVerified=false;
  constructor() { }

  ngOnInit(): void {
  }

}
