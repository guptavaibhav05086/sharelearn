import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Productlist } from "src/app/Models/productlist";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-product-lists",
  templateUrl: "./product-lists.component.html",
  styleUrls: ["./product-lists.component.css"]
})
export class ProductListsComponent implements OnInit {
  @Input() isEdit;
  @Input() selProduct;
  product = new Productlist();
  isPhotoUrlValid: boolean;
  fileError = false;
  uploadedFileNames = {
    product: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    content: "Content File in .doc,docx,.pdf format",
    IsImageUploaded: false,
    contentValidation: false,
    IsproductRefUploaded: false,
    displayLoadingProductGif: false,
    displayLoadingContentGif: false,
    IscontentUploaded: false
  };
  imageUpload = [
    {
      id: 1,
      name: "image1",
      displayLoadingGif: false,
      displayFileName: false,
      fileName: "",
      fileSize: 0,
      fileError: false,
      serverFileName: "",
      displyBtn: true
    }
  ];
  uploadLogoImage(images: FileList, name: string, itemId: number) {
    ////debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    ////debugger;
    for (var i = 0; (file = images[i]); i++) {
      //if the file is not an image, continue
      if (!this.validateFiles(name, file)) {
        alert("Not a Valid Image File");
        return;
      }
      let reader = new FileReader();

      reader.readAsDataURL(file);
    }
    formData.append(name, userImage, userImage.name);

    //this.selectedFileName=userImage.name;
    //this.spinner.show();
    let item = this.imageUpload.filter(item => item.id == itemId)[0];
    item.fileName = userImage.name;
    item.displayLoadingGif = true;
    item.fileSize = userImage.size;
    let totalSize = 0;
    this.imageUpload.forEach(item => {
      totalSize += item.fileSize;
    });
    if (totalSize > 25000000) {
      alert("Total Size exceeds more then 25MB.Please upload smaller files");
      item.displayLoadingGif = false;
      return;
    }
    //debugger;
    let elm = this.document.getElementById(name);
    elm["value"] = null;
    // let elm =this.elRef.nativeElement.querySelector(name);
    // elm.val(null);
    this.service.uploadProdImage(formData).subscribe(
      data => {
        //this.spinner.hide();
        debugger;
        item.displayLoadingGif = false;
        item.displayFileName = true;
        console.log(data);
        item.serverFileName = data.toString();
        //alert("File Uploaded Successfully");
        //this.uploadedFileNames[name] = item;
        this.fileError = false;
        this.uploadedFileNames.IsImageUploaded = true;
        //this.uploadedFileNames.displayReadOnlyError = false;
        item.fileError = false;
        //this.selectedFileName = userImage.name;
      },
      err => {
        //this.spinner.hide();
        ////debugger;

        this.uploadedFileNames.displayLoadingProductGif = false;
        item.displayLoadingGif = false;
        item.fileError = true;
        this.fileError = true;
        alert("Issue in file upload please contact admin");
      }
    );
  }
  addImage(i) {
    let imgname = "image" + (i + 1);
    this.imageUpload.forEach(item => item.displyBtn == false);
    this.imageUpload.push({
      id: i + 1,
      name: imgname,
      displayLoadingGif: false,
      displayFileName: false,
      fileName: "",
      fileSize: 0,
      fileError: false,
      serverFileName: "",
      displyBtn: true
    });
  }
  removeImage(i) {
    if (i == 1) {
      let item = this.imageUpload.filter(item => item.id == i)[0];
      item.displayFileName = false;
    } else {
      this.imageUpload = this.imageUpload.filter(item => item.id != i);
    }
  }
  updateSuccess = false;
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),

    preferenece: new FormControl(0, [Validators.required]),
    classification: new FormControl("", [Validators.required])
  });
  constructor(
    public activeModal: NgbActiveModal,
    private service: AdminService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    ////debugger;
    if (this.isEdit) {
      this.productform.patchValue({
        Pname: this.selProduct["value"],
        preferenece: this.selProduct["producPreference"],
        classification: this.selProduct["category"]
        //category
      });
      this.uploadedFileNames.product = this.selProduct["productImage"];
      this.uploadedFileNames.image1 = this.selProduct["productIcon"];
      this.uploadedFileNames.IscontentUploaded = true;
      this.uploadedFileNames.IsproductRefUploaded = true;
    }
  }
  stopDefault(e) {
    e.preventDefault();
  }
  validateFiles(name: string, file: File): boolean {
    if (name == "content") {
      if (
        !file.type.match(
          "text.*|image.*|application.pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        this.isPhotoUrlValid = false;
        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
      if (file.size > 5000000) {
        this.isPhotoUrlValid = false;

        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
      return this.isPhotoUrlValid;
    }
    if (name != "GST") {
      if (!file.type.match("image.*|application.pdf")) {
        this.isPhotoUrlValid = false;
        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
      if (file.size > 5000000) {
        this.isPhotoUrlValid = false;

        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
    }

    return true;
  }

  uploadGSTCertificate(images: FileList, name: string) {
    ////debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    ////debugger;
    for (var i = 0; (file = images[i]); i++) {
      //if the file is not an image, continue
      if (!this.validateFiles(name, file)) {
        alert("Not a Valid Image File");
        return;
      }
      let reader = new FileReader();

      reader.readAsDataURL(file);
    }
    formData.append(name, userImage, userImage.name);

    //this.selectedFileName=userImage.name;
    //this.spinner.show();
    if (name == "product") {
      this.uploadedFileNames.displayLoadingProductGif = true;
    } else {
      this.uploadedFileNames.displayLoadingProductGif = false;
    }
    if (name == "image1") {
      this.uploadedFileNames.displayLoadingContentGif = true;
    } else {
      this.uploadedFileNames.displayLoadingContentGif = false;
    }
    this.service.uploadProdImage(formData).subscribe(
      data => {
        //debugger;
        console.log(data);
        //alert("File Uploaded Successfully");
        this.uploadedFileNames[name] = data;
        this.fileError = false;
        this.uploadedFileNames.IsImageUploaded = true;
        //this.selectedFileName = userImage.name;
        if (name == "image1") {
          this.uploadedFileNames.contentValidation = true;
          this.uploadedFileNames.displayLoadingContentGif = false;
          this.uploadedFileNames.IscontentUploaded = true;
        }
        if (name == "product") {
          this.uploadedFileNames.IsproductRefUploaded = true;
        } else {
          //this.uploadedFileNames.IsproductRefUploaded = false;
        }
        this.uploadedFileNames.displayLoadingProductGif = false;
      },
      err => {
        ////debugger;
        this.fileError = true;
        alert("Issue in file upload please contact admin");
        if (name == "image1") {
          this.uploadedFileNames.contentValidation = false;
          this.uploadedFileNames.displayLoadingContentGif = false;
          this.uploadedFileNames.IscontentUploaded = false;
        }
        if ((name = "product")) {
          this.uploadedFileNames.IsproductRefUploaded = false;
        } else {
          this.uploadedFileNames.IsproductRefUploaded = true;
        }
        this.uploadedFileNames.displayLoadingProductGif = false;
      }
    );
  }
  CreateNewproduct() {}
  updateNewproduct() {
    debugger;
    if (this.isEdit) {
      this.product.productId = this.selProduct["key"];
      this.product.producPreference = this.productform.controls[
        "preferenece"
      ].value;
    } else {
      this.product.productId = 0;
      this.product.producPreference = 0;
    }

    this.product.productName = this.productform.controls["Pname"].value;

    this.product.productCategory = this.productform.controls[
      "classification"
    ].value;
    this.product.productImage = this.uploadedFileNames.product;
    this.product.productIcon = this.uploadedFileNames.image1;
    this.product.imageUpload = this.imageUpload;

    this.service.updateProductList(this.product).subscribe(
      data => {
        this.updateSuccess = true;
      },
      err => {}
    );
  }
}
