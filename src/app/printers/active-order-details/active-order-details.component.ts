import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PrinterService } from "../../services/printer.service";
@Component({
  selector: 'app-active-order-details',
  templateUrl: './active-order-details.component.html',
  styleUrls: ['./active-order-details.component.css']
})
export class ActiveOrderDetailsComponent implements OnInit {
  @Input() data;
  constructor(public activeModal: NgbActiveModal,
    private service: PrinterService) { }

  ngOnInit(): void {
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
  imageUpload=[{
    id:1,
    name:'image1',
    displayLoadingGif:false,
    displayFileName:false,
    fileName:'',
    fileSize:0,
    fileError:false,
    serverFileName:''
  }];
  addImage(i){
    debugger;
    if(this.imageUpload.length < 4){

      let imgname = 'image' + (i+1);
    this.imageUpload.push({
      id:i+1,
      name:imgname,
      displayLoadingGif:false,
      displayFileName:false,
      fileName:'',
      fileSize:0,
      fileError:false,
      serverFileName:''
    })
    }
    
  }
  removeImage(i){
    if(i ==1){
      let item = this.imageUpload.filter(item=>item.id == i)[0];
      item.displayFileName=false;
    }
    else{
      this.imageUpload=this.imageUpload.filter(item=>item.id != i);
    }
    

  }
  
  uploadGSTCertificate(images: FileList, id, name: string,uploadImageId) {
    debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    //debugger;
    for (var i = 0; (file = images[i]); i++) {
      //if the file is not an image, continue
      // if (!this.validateFiles(name, file)) {
      //   //alert("Not a Valid Image File");
      //   return;
      // }
      let reader = new FileReader();

      reader.readAsDataURL(file);
    }
    formData.append(name, userImage, userImage.name);

    let uplImg;
    if (name == "source") {
      uplImg= this.imageUpload.filter(item=>item.id==uploadImageId)[0];
      uplImg.displayLoadingGif=true;
      uplImg.fileName=userImage.name;
      //this.uploadedFileNames.displayLoadingProductGif = true;
    } else {
      //this.uploadedFileNames.displayLoadingProductGif = false;
    }
    if (name == "normal") {
      this.uploadedFileNames.displayLoadingContentGif = true;
    } else {
      this.uploadedFileNames.displayLoadingContentGif = false;
    }
    //this.service.uploadFinalSourceImage(formData, id, name).subscribe(
    //  data => {
        //this.spinner.hide();
        //debugger;
     //   console.log(data);
        //alert("File Uploaded Successfully");
        //this.uploadedFileNames[name] = data;
        
     //   this.uploadedFileNames[name] = userImage.name;
        //this.fileError = false;
     //   this.uploadedFileNames.IsImageUploaded = true;
        //this.selectedFileName = userImage.name;
     //   if (name == "source") {
        //  uplImg.displayLoadingGif=false;
        //  uplImg.displayFileName=true;
          // this.uploadedFileNames.contentValidation = true;
          // this.uploadedFileNames.displayLoadingContentGif = false;
          // this.uploadedFileNames.IscontentUploaded = true;
          //this.uploadedFileNames.contentServerFile=data.toString();
     //   }
        // if (name == "normal") {
        //   this.uploadedFileNames.IsproductRefUploaded = true;
        //   this.uploadedFileNames.displayErrororbutton = false;
         //this.uploadedFileNames.productServerFile=data.toString();
      //  } else {
          //this.uploadedFileNames.IsproductRefUploaded=false;
     //   }
     //   this.uploadedFileNames.displayLoadingProductGif = false;
     // },
    //  err => {
        //this.spinner.hide();
        //debugger;
        //this.fileError = true;
        // alert("Issue in file upload please contact admin");
        // if (name == "source") {
        //   uplImg.displayLoadingGif=false;
        //   uplImg.displayFileName=false;
          // this.uploadedFileNames.contentValidation = false;
          // this.uploadedFileNames.displayLoadingContentGif = false;
          // this.uploadedFileNames.IscontentUploaded = false;
  //       }
  //       if ((name = "normal")) {
  //         this.uploadedFileNames.IsproductRefUploaded = false;
  //       } else {
  //         this.uploadedFileNames.IsproductRefUploaded = true;
  //       }
  //       this.uploadedFileNames.displayLoadingProductGif = false;
  //     }
  //   );
  // }
  // downloadFile(filename, e) {
  //   debugger;
  //   e.preventDefault();
  //   this.service.downloadOrderFiles(filename).subscribe(
  //     (response: any) => {
  //       let dataType = response.type;
  //       let binaryData = [];
  //       binaryData.push(response);
  //       let downloadLink = document.createElement("a");
  //       downloadLink.href = window.URL.createObjectURL(
  //         new Blob(binaryData, { type: dataType })
  //       );
  //       if (filename) downloadLink.setAttribute("download", filename);
  //       document.body.appendChild(downloadLink);
  //       downloadLink.click();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  // startMeeting() {
  //   window.open(this.data.MeetingUrl, "_blank");
   }
}

