import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DesignerService } from "../../services/designer.service";
@Component({
  selector: "app-active-order-details",
  templateUrl: "./active-order-details.component.html",
  styleUrls: ["./active-order-details.component.css"]
})
export class ActiveOrderDetailsComponent implements OnInit {
  @Input() data;
  orderItems: any;
  constructor(
    public activeModal: NgbActiveModal,
    private service: DesignerService
  ) {}

  ngOnInit(): void {
    debugger;
    this.orderItems = this.data.ongoingOrders;
    console.log(this.data.ongoingOrders);
  }
  uploadedFileNames = {
    product: "",
    IsImageUploaded: false,
    contentValidation: false,
    IsproductRefUploaded: false,
    displayErrororbutton: false,
    displayLoadingProductGif: false,
    displayLoadingContentGif: false,
    IscontentUploaded: false,
    displayReadOnlyError: false
  };

  downloadFile(filename, e) {
    debugger;
    e.preventDefault();
    this.service.downloadOrderFiles(filename).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      err => {
        console.log(err);
      }
    );
  }
  startMeeting(){
    window.open(this.data.MeetingUrl,'_blank');
  }
}
