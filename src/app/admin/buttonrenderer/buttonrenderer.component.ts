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

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
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
