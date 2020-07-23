import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Productlist } from "src/app/Models/productlist";
import { AdminService } from "../../services/admin.service";
@Component({
  selector: "app-products-forms",
  templateUrl: "./products-forms.component.html",
  styleUrls: ["./products-forms.component.css"]
})
export class ProductsFormsComponent implements OnInit {
  isPhotoUrlValid: boolean;
  isImage: boolean;
  isSizeValid;
  isDisabled=false;
  boolean;
  product = new Productlist();
  selectedFileName = "Choose Image";
  @Input() productList;
  @Input() editForm;
  @Input() selectedProduct;
  updateSuccess = false;
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),
    subCat: new FormControl("", [Validators.required]),
    orientation: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    paperGSM: new FormControl("", [Validators.required]),
    quantities: new FormControl("", [Validators.required]),
    classification: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    dprice: new FormControl(""),
    dCommission: new FormControl(""),
    dGST: new FormControl(""),
    pprice: new FormControl(""),
    pCommission: new FormControl(""),
    pGST: new FormControl(""),
    preferenece: new FormControl(""),
    description: new FormControl(""),
  });
  constructor(
    private _validator: ValidatorsService,
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    public admin: AdminService
  ) {}

  ngOnInit(): void {
    debugger;
    if (this.editForm == true) {
      this.productform.patchValue({
        Pname: this.selectedProduct["productId"],
        subCat: this.selectedProduct["productSubcategory"],
        orientation: this.selectedProduct["orientation"],
        size: this.selectedProduct["productSize"],
        paperGSM: this.selectedProduct["paperGSM"],
        quantities: this.selectedProduct["quantities"],
        classification: this.selectedProduct["productCategory"],
        price: this.selectedProduct["price"],
        dprice:this.selectedProduct["DesignPrice"],
    dCommission:this.selectedProduct["DesignCommision"],
    dGST:this.selectedProduct["DesignGST"],
    pprice:this.selectedProduct["PrintPrice"],
    pCommission:this.selectedProduct["PrintCommision"],
    pGST:this.selectedProduct["PrintGST"],
    preferenece:this.selectedProduct["producPreference"],
    description:this.selectedProduct["productDescription"],
      });
    }
  }
  createProduct() {}
  updateProduct() {
    this.product.orientation = this.productform.controls["orientation"].value;
    this.product.productSize = this.productform.controls["size"].value;
    this.product.productSubcategory = this.productform.controls["subCat"].value;
    this.product.paperGSM = this.productform.controls["paperGSM"].value;
    this.product.quantities = this.productform.controls["quantities"].value;
    this.product.productCategory = this.productform.controls[
      "classification"
    ].value;
    this.product.price = this.productform.controls["price"].value;


    this.product.DesignCommision = this.productform.controls["dCommission"].value;
    this.product.DesignGST = this.productform.controls["dGST"].value;
    this.product.DesignPrice = this.productform.controls["dprice"].value;
    this.product.PrintCommision = this.productform.controls["pCommission"].value;
    this.product.PrintGST = this.productform.controls["pGST"].value;
    this.product.PrintPrice = this.productform.controls["pprice"].value;
    this.product.producPreference = this.productform.controls["preferenece"].value;
    this.product.productDescription = this.productform.controls["description"].value;
    


    if (this.editForm == true) {
      this.product.productsubId = this.selectedProduct["productsubId"];
    } else {
      debugger;
      this.product.productsubId = 0;
      this.product.productId = this.productform.controls["Pname"].value;
    }

    this.admin.updateProduct(this.product).subscribe(data => {
      this.updateSuccess = true;
    });
  }
  uploadGSTCertificate(images: FileList, name: string) {
    debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    debugger;
    for (var i = 0; (file = images[i]); i++) {
      //if the file is not an image, continue
      if (!this.validateFiles(name, file)) {
        if (!this.isPhotoUrlValid) {
          alert("Not a Valid Image");
        } else if (!this.isSizeValid) {
          //this.toast.error('File Size should be less then 5 MB');
          alert("File Size should be less then 5 MB");
        }
        return;
      }
      let reader = new FileReader();

      reader.readAsDataURL(file);
      //this._awsupload.uploadfile(file);
    }
    formData.append("userimage", userImage, userImage.name);
    this.selectedFileName = userImage.name;
    this.admin.uploadProdImage(formData).subscribe(
      data => {
        debugger;
        this.product.productImage = data;
      },
      err => {}
    );
  }

  validateFiles(name: string, file: File): boolean {
    if (!file.type.match("image.*")) {
      this.isPhotoUrlValid = false;
      return false;
    } else {
      this.isPhotoUrlValid = true;
    }
    if (file.size > 5000000) {
      this.isSizeValid = false;

      return false;
    } else {
      this.isSizeValid = true;
    }

    return true;
  }
}
