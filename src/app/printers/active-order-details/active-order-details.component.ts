import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PrinterService } from "../../services/printer.service";
@Component({
  selector: "app-active-order-details",
  templateUrl: "./active-order-details.component.html",
  styleUrls: ["./active-order-details.component.css"]
})
export class ActiveOrderDetailsComponent implements OnInit {
  @Input() data;
  orderItems: any;
  @Input() isAllOrders;
  isDeliveryCompleted: false;
  toggleUploadInvoiceButton: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private service: PrinterService
  ) {}

  ngOnInit(): void {
    debugger;
    //this.toggleUploadInvoiceButton = this.isAllOrders;
    this.isAllOrders = true;
    this.orderItems = this.data.ongoingOrders;
    this.isDeliveryCompleted = this.data.ongoingOrders[0].isPrintCompleted;
    this.toggleUploadInvoiceButton = this.isDeliveryCompleted;

    this.initializeFiles();
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
  stopDefault(event) {}
  imageUpload = [
    {
      id: 1,
      name: "image1",
      displayLoadingGif: false,
      displayFileName: false,
      fileName: "",
      fileSize: 0,
      fileError: false,
      serverFileName: ""
    }
  ];
  imageUploadNormal = [
    {
      id: 1,
      name: "imageNormal1",
      displayLoadingGif: false,
      displayFileName: false,
      fileName: "",
      fileSize: 0,
      fileError: false,
      serverFileName: ""
    }
  ];
  initializeFiles() {
    this.imageUpload = [];
    for (let index = 0; index < this.data.ongoingOrders.length; index++) {
      const FinalNormalDesignFile = this.data.ongoingOrders[index]
        .FinalNormalDesignFile;
      const sourcecodeFinalDesignFile = this.data.ongoingOrders[index]
        .sourcecodeFinalDesignFile;
      let imageUploadDataNormal = [];
      let imageUploadDataSource = [];
      if (FinalNormalDesignFile != null) {
        FinalNormalDesignFile.forEach((element, index) => {
          if (element != "") {
            imageUploadDataNormal.push({
              id: index + 1,
              name: "imageNormal" + (index + 1),
              displayLoadingGif: false,
              displayFileName: true,
              fileName: element,
              fileSize: 0,
              fileError: false,
              serverFileName: element
            });
          }
        });
      }

      this.orderItems[index].NormalUploads = imageUploadDataNormal;

      if (sourcecodeFinalDesignFile != null) {
        sourcecodeFinalDesignFile.forEach((element, index) => {
          if (element != "") {
            imageUploadDataSource.push({
              id: index + 1,
              name: "image" + (index + 1),
              displayLoadingGif: false,
              displayFileName: true,
              fileName: element,
              fileSize: 0,
              fileError: false,
              serverFileName: element
            });
          }
        });
      }

      this.orderItems[index].SourceUploads = imageUploadDataSource;
      if (this.orderItems[index].SourceUploads.length == 0) {
        this.orderItems[index].SourceUploads = [
          {
            id: 1,
            name: "image1",
            displayLoadingGif: false,
            displayFileName: false,
            fileName: "",
            fileSize: 0,
            fileError: false,
            serverFileName: ""
          }
        ];
      }
      if (this.orderItems[index].NormalUploads.length == 0) {
        this.orderItems[index].NormalUploads = [
          {
            id: 1,
            name: "imageNormal",
            displayLoadingGif: false,
            displayFileName: false,
            fileName: "",
            fileSize: 0,
            fileError: false,
            serverFileName: ""
          }
        ];
      }
    }
    if (this.data.PrinterInvoiceURL != null) {
      this.uploadedFileNames.product = this.data.PrinterInvoiceURL;
      this.uploadedFileNames.displayLoadingProductGif = false;
    }
  }
  addImage(i, orderId, type) {
    //debugger;
    //if(this.imageUpload.length < 4){
    //let imgname = "image" + (i + 1);
    let selItem = this.orderItems.filter(i => i.id == orderId)[0];
    if (type == "source") {
      let imgname = "image" + (i + 1);
      selItem.SourceUploads.push({
        id: i + 1,
        name: imgname,
        displayLoadingGif: false,
        displayFileName: false,
        fileName: "",
        fileSize: 0,
        fileError: false,
        serverFileName: ""
      });
    } else if (type == "normal") {
      let imgname = "imageNormal" + (i + 1);
      selItem.NormalUploads.push({
        id: i + 1,
        name: imgname,
        displayLoadingGif: false,
        displayFileName: false,
        fileName: "",
        fileSize: 0,
        fileError: false,
        serverFileName: ""
      });
    }
  }
  removeImage(i, orderId, type) {
    //debugger;
    let selItem = this.orderItems.filter(i => i.id == orderId)[0];

    if (type == "source") {
      if (i == 1 && selItem.SourceUploads.length == 1) {
        selItem.SourceUploads[0].displayFileName = false;
        return;
      }
      selItem.SourceUploads = selItem.SourceUploads.filter(
        item => item.id != i
      );
    }
    if (type == "normal") {
      if (i == 1 && selItem.NormalUploads.length == 1) {
        selItem.NormalUploads[0].displayFileName = false;
        return;
      }
      selItem.NormalUploads = selItem.NormalUploads.filter(
        item => item.id != i
      );
    }
  }

  uploadGSTCertificate(images: FileList, name: string) {
    //debugger;
    var result = "";
    var file;

    const formData = new FormData();
    var userImage = images.item(0);
    ////debugger;
    for (var i = 0; (file = images[i]); i++) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
    }

    formData.append(name, userImage, userImage.name);
    //formData.append("FileNames", keys);
    this.service.uploadFinalInvoice(formData, this.data.OrderId).subscribe(
      data => {
        //debugger;
        console.log(data);
        this.uploadedFileNames.product = userImage.name;
        this.uploadedFileNames.displayLoadingProductGif = false;
      },
      err => {
        this.uploadedFileNames.displayLoadingProductGif = false;
        alert("Issue in file upload please contact admin");
      }
    );
  }
  downloadFile(filename, e, type) {
    //debugger;
    e.preventDefault();
    this.service.downloadOrderFiles(filename, type).subscribe(
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
  startMeeting() {
    window.open(this.data.MeetingUrl, "_blank");
  }
}
