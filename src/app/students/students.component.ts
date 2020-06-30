import { Component, OnInit } from "@angular/core";
//import moduleName from "../../assets/DashBoard/css/theme.css";
@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: [
    "./students.component.css",

    "../../assets/StudentDashboard/demo/demo.css",
    "../../assets/DashBoard/css/style.css",
    "../../assets/DashBoard/css/theme.css"
  ]
})
export class StudentsComponent implements OnInit {
  isDesignerVerified = false;
  constructor() {}

  ngOnInit() {}
}
