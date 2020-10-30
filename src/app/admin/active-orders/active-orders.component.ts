import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  @Input() data;
  orderItems: any;
  @Input() isAllOrders;
  displayFinishButton = false;
  @Input() displayOnGoingOrdersElement = true;
  designConfirm = false;
  userFinishedOrders = false;
  containsDesignOrders=false;
  //@Input() orderId;
  constructor(
    public activeModal: NgbActiveModal,
    private service: CustomerService
  ) {}

  ngOnInit(): void {
    debugger;
    this.orderItems = this.data.ongoingOrders;
    this.orderItems.forEach(item=> {
      if(item.orderType == "Design Only" ||item.orderType == "Design And Print"){
        this.containsDesignOrders=true;
      }

    });
    this.userFinishedOrders = this.orderItems[0].isDesignCompleted;
    this.initializeFiles();
    this.validateMeetingStartTime();
    console.log(this.data);
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
    for (let i = 0; i < this.data.ongoingOrders.length; i++) {
      const FinalNormalDesignFile = this.data.ongoingOrders[i]
        .FinalNormalDesignFile;
      const sourcecodeFinalDesignFile = this.data.ongoingOrders[i]
        .sourcecodeFinalDesignFile;
      let imageUploadDataNormal = [];
      let imageUploadDataSource = [];
      if (FinalNormalDesignFile != null) {
        FinalNormalDesignFile.forEach((element, index) => {
          if (element != "") {
            let itemId = i * 100 + (index + 1);
            imageUploadDataNormal.push({
              id: itemId,
              name: "imageNormal" + itemId,
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

      this.orderItems[i].NormalUploads = imageUploadDataNormal;

      if (sourcecodeFinalDesignFile != null) {
        sourcecodeFinalDesignFile.forEach((element, index) => {
          if (element != "") {
            let itemId = i * 100 + (index + 1);
            imageUploadDataSource.push({
              id: itemId,
              name: "image" + itemId,
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

      this.orderItems[i].SourceUploads = imageUploadDataSource;
      if (this.orderItems[i].SourceUploads.length == 0) {
        this.orderItems[i].SourceUploads = [
          {
            id: i * 100 + 1,
            name: "image1" + (i * 100 + 1),
            displayLoadingGif: false,
            displayFileName: false,
            fileName: "",
            fileSize: 0,
            fileError: false,
            serverFileName: ""
          }
        ];
      }
      if (this.orderItems[i].NormalUploads.length == 0) {
        this.orderItems[i].NormalUploads = [
          {
            id: i * 100 + 1,
            name: "imageNormal" + (i * 100 + 1),
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
  }
  addImage(i, orderId, type) {
    debugger;
    //if(this.imageUpload.length < 4){
    //let imgname = "image" + (i + 1);
    let selItem = this.orderItems.filter(i => i.id == orderId)[0];
    if (type == "source") {
      if (selItem.SourceUploads[0].fileName == "") {
        alert("Select File in element first");
        return;
      }
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
      if (selItem.NormalUploads[0].fileName == "") {
        alert("Select File in element first");
        return;
      }
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
    debugger;
    let selItem = this.orderItems.filter(i => i.id == orderId)[0];

    if (type == "source") {
      if (selItem.SourceUploads.length == 1) {
        selItem.SourceUploads[0].displayFileName = false;
        return;
      }
      selItem.SourceUploads = selItem.SourceUploads.filter(
        item => item.id != i
      );
    }
    if (type == "normal") {
      if (selItem.NormalUploads.length == 1) {
        selItem.NormalUploads[0].displayFileName = false;
        return;
      }
      selItem.NormalUploads = selItem.NormalUploads.filter(
        item => item.id != i
      );
    }
  }
  validateMeetingStartTime() {
    debugger;
    var mT = new Date(this.data.meetingTime);
    var cuD = new Date();
    if (cuD.getTime() > mT.getTime()) {
      this.displayFinishButton = true;
      console.log("Meeting Started");
    } else {
      this.displayFinishButton = false;
    }
  }
  uploadGSTCertificate(images: FileList, id, name: string, uploadImageId) {
    debugger;
    console.log(this.orderItems);
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    //debugger;
    for (var i = 0; (file = images[i]); i++) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
    }
    let fileName = "FinalDesignFile-" + id + userImage.name;

    let keys = "";

    let uplImg;
    let selItem = this.orderItems.filter(i => i.id == id)[0];
    if (name == "source") {
      uplImg = selItem.SourceUploads.filter(
        item => item.id == uploadImageId
      )[0];
      uplImg.displayLoadingGif = true;
      uplImg.fileName = userImage.name;
      uplImg.serverFileName = fileName;
      selItem.SourceUploads.forEach(item => {
        if (keys == "") {
          keys = item.serverFileName;
        } else {
          keys = keys + ";" + item.serverFileName;
        }
      });
    } else {
      //this.uploadedFileNames.displayLoadingProductGif = false;
    }
    if (name == "normal") {
      uplImg = selItem.NormalUploads.filter(
        item => item.id == uploadImageId
      )[0];
      uplImg.displayLoadingGif = true;
      uplImg.fileName = userImage.name;
      uplImg.serverFileName = fileName;
      selItem.NormalUploads.forEach(item => {
        if (keys == "") {
          keys = item.serverFileName;
        } else {
          keys = keys + ";" + item.serverFileName;
        }
      });
    } else {
    }

    formData.append(name, userImage, userImage.name);
    formData.append("FileNames", keys);

    // this.service.uploadFinalSourceImage(formData, id, name).subscribe(
    //   data => {
    //     debugger;
    //     console.log(data);
    //     keys = "";
    //     uplImg.displayLoadingGif = false;
    //     uplImg.displayFileName = true;
    //     this.uploadedFileNames.displayLoadingProductGif = false;
    //   },
    //   err => {
    //     keys = "";
    //     uplImg.displayLoadingGif = false;
    //     alert("Issue in file upload please contact admin");

    //   }
    // );
  }
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
  downloadFinalDesignFiles(filename, e){
    debugger;
    e.preventDefault();
    this.service.downloadDesignCompletedFiles(filename).subscribe(
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
  FinishOrder() {
    this.service.acceptDesign(this.data.OrderId).subscribe(data => {
      debugger;
      this.userFinishedOrders = true;
      alert("Order Completed Successfully.Now You can download the Files");
      this.service.sendPrintNotifications(this.data.OrderId).subscribe(data => {
        console.log("Notification Send");
      });
      //this.activeModal.close();
    });
  }
  // AcceptDesign(){
  //   console()
  // }

}
