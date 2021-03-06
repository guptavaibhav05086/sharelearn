import { Component, OnInit } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams
} from "ag-grid-community";

@Component({
  selector: "app-buttonrenderer",
  templateUrl: "./buttonrenderer.component.html",
  styleUrls: ["./buttonrenderer.component.css"]
})
export class ButtonrendererComponent implements ICellRendererAngularComp {
  params;
  label: string;
  disableBtn=false;
  agInit(params): void {
    ////debugger;
    this.params = params;
    this.label = this.params.label || null;
    if (this.params.label == "ProdDelete") {
      if (this.params.data.IsDisabled == false) {
        this.label = "Disable";
      } else {
        this.label = "Enable";
      }
    }
    if (this.params.label == "Book Slot") {
      if (this.params.data.eligibleForReschedule == false) {
        this.disableBtn =true;
      } else {
        this.disableBtn =false;
      }
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
