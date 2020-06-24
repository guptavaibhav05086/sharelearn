import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-studentprofile",
  templateUrl: "./studentprofile.component.html",
  styleUrls: ["./studentprofile.component.css"]
})
export class StudentprofileComponent implements OnInit {
  isDisabled: boolean = true;
  isDisableProfession: boolean = true;
  constructor() {}

  ngOnInit() {}
  editForm(formname) {
    if (formname == "personal") this.isDisabled = false;
    else this.isDisableProfession = false;
  }
  updateForm(formname) {
    if (formname == "personal") this.isDisabled = true;
    else this.isDisableProfession = true;
  }
}
