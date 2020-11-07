import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  templateUrl: "./button-renderer.component.html",
  styleUrls: ["./button-renderer.component.css"]
})
export class ButtonrendererComponent implements ICellRendererAngularComp {
  params;
  label: string;
  disableButton = false;

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
    if (
      this.params.data.DunzoTaskId != null &&
      this.params.label == "Initiate Delivery"
    ) {
      this.disableButton = true;
    } else if (
      this.params.data.DunzoTaskId != null &&
      this.params.label == "Track"
    ) {
      this.disableButton = false;
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
