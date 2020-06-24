import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
@Component({
  selector: "app-mern",
  templateUrl: "./mern.component.html",
  styleUrls: ["./mern.component.css"]
})
export class MernComponent implements OnInit {
  constructor(private _helper: HelperService) {}
  courseId = 8;
  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }
}
