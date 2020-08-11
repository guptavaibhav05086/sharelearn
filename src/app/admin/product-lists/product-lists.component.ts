import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Productlist } from "src/app/Models/productlist";
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
    product: ".jpg,.png,.jpeg,pdf format",
    image1: "",
    image2: ".jpg,.png,.jpeg,pdf format",
    image3: ".jpg,.png,.jpeg,pdf format",
    image4: ".jpg,.png,.jpeg,pdf format",
    content: "Content File in .doc,docx,.pdf format",
    IsImageUploaded: false,
    contentValidation: false,
    IsproductRefUploaded: false,
    displayLoadingProductGif: false,
    displayLoadingContentGif: false,
    IscontentUploaded: false
  };
  updateSuccess = false;
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),

    preferenece: new FormControl("", [Validators.required]),
    classification: new FormControl("", [Validators.required])
  });
  constructor(
    public activeModal: NgbActiveModal,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    debugger;
    if (this.isEdit) {
      this.productform.patchValue({
        Pname: this.selProduct["value"],
        preferenece: this.selProduct["producPreference"],
        classification: this.selProduct["category"]
        //category
      });
      this.uploadedFileNames.product = this.selProduct["productImage"];
      this.uploadedFileNames.image1 = this.selProduct["productIcon"];
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
    //debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    //debugger;
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
        debugger;
        console.log(data);
        alert("File Uploaded Successfully");
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
        //debugger;
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
    if (this.isEdit) {
      this.product.productId = this.selProduct["key"];
    } else {
      this.product.productId = 0;
    }

    this.product.productName = this.productform.controls["Pname"].value;
    this.product.producPreference = this.productform.controls[
      "preferenece"
    ].value;
    this.product.productCategory = this.productform.controls[
      "classification"
    ].value;
    this.product.productImage = this.uploadedFileNames.product;
    this.product.productIcon = this.uploadedFileNames.image1;

    this.service.updateProductList(this.product).subscribe(
      data => {
        this.updateSuccess = true;
      },
      err => {}
    );
  }
}
