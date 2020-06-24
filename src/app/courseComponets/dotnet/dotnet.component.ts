import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";

@Component({
  selector: "app-dotnet",
  templateUrl: "./dotnet.component.html",
  styleUrls: ["./dotnet.component.css"]
})
export class DotnetComponent implements OnInit {
  constructor(private _helper: HelperService) {}

  ngOnInit() {}
  register(courseId, topicId) {
    this._helper.navigateToRegister(courseId, topicId);
  }
}
