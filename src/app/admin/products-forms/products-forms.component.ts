import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ValidatorsService } from "src/app/services/validators.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Productlist, ProductprintPrice } from "src/app/Models/productlist";
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
  isDisabled = false;
  boolean;
  product = new Productlist();
  selectedFileName = "Choose Image";
  @Input() productList;
  @Input() editForm;
  @Input() selectedProduct;
  @Input() printPriceList;
  updateSuccess = false;
  printPrice = new Array<ProductprintPrice>();
  productform = new FormGroup({
    Pname: new FormControl("", [Validators.required]),
    subCat: new FormControl("", [Validators.required]),
    orientation: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    paperGSM: new FormControl("", [Validators.required]),
    quantities: new FormControl(""),
    classification: new FormControl("", [Validators.required]),
    productCode: new FormControl("", [Validators.required]),
    dprice: new FormControl(""),
    dCommission: new FormControl(""),
    dGST: new FormControl(""),
    pprice: new FormControl(""),
    pCommission: new FormControl(""),
    pGST: new FormControl(""),
    deliveryFees: new FormControl(""),
    description: new FormControl(""),
    deliveryTime: new FormControl("")
  });
  constructor(
    private _validator: ValidatorsService,
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    public admin: AdminService
  ) {}

  ngOnInit(): void {
    debugger;
    if (this.printPriceList.length == 0) {
      let item = new ProductprintPrice();
      item.prodDetailsId = this.selectedProduct.poductDetailsId;
      item.Id = 0;
      item.pricePerUnit = 0;
      item.printCommission = 0;
      item.qunatity = 0;
      this.printPrice.push(item);
    } else {
      for (let i = 0; i < this.printPriceList.length; i++) {
        this.loadItem(i, this.printPriceList[i]);
      }
    }
    if (this.editForm == true) {
      this.productform.patchValue({
        Pname: this.selectedProduct["productId"],
        subCat: this.selectedProduct["productSubcategory"],
        orientation: this.selectedProduct["orientation"],
        size: this.selectedProduct["productSize"],
        paperGSM: this.selectedProduct["paperGSM"],
        quantities: this.selectedProduct["quantities"],
        classification: this.selectedProduct["productCategory"],
        productCode: this.selectedProduct["productCode"],
        dprice: this.selectedProduct["DesignPrice"],
        dCommission: this.selectedProduct["DesignCommision"],
        dGST: this.selectedProduct["DesignGST"],
        pprice: this.selectedProduct["PrintPrice"],
        pCommission: this.selectedProduct["PrintCommision"],
        pGST: this.selectedProduct["PrintGST"],
        description: this.selectedProduct["productDescription"],
        deliveryFees: this.selectedProduct["deliveryFees"],
        deliveryTime: this.selectedProduct["deliveryTime"]
      });
    }
  }
  loadItem(index, row) {
    let item = new ProductprintPrice();
    item.prodDetailsId = this.selectedProduct.poductDetailsId;
    item.Id = index;
    item.pricePerUnit = row.pricePerUnit;
    item.printCommission = row.printCommission;
    item.qunatity = row.qunatity;
    this.printPrice.push(item);

    console.log(this.printPrice);
  }
  createItem(index) {
    let item = new ProductprintPrice();
    item.prodDetailsId = this.selectedProduct.poductDetailsId;
    item.Id = index + 1;
    item.pricePerUnit = 0;
    item.printCommission = 0;
    item.qunatity = 0;
    this.printPrice.push(item);

    console.log(this.printPrice);
  }
  removeItem(index) {
    debugger;
    this.printPrice = this.printPrice.filter(i => i.Id != index);
  }
  setpriceprint(event, i) {
    debugger;
    console.log(event);
    let row = this.printPrice.filter(item => item.Id == i)[0];
    row.pricePerUnit = event.target.value;
  }
  setquantprint(event, i) {
    console.log(event);
    let row = this.printPrice.filter(item => item.Id == i)[0];
    row.qunatity = event.target.value;
  }
  setcommisonprint(event, i) {
    console.log(event);
    let row = this.printPrice.filter(item => item.Id == i)[0];
    row.printCommission = event.target.value;
  }
  setdeliverydaysprint(event, i) {
    console.log(event);
    let row = this.printPrice.filter(item => item.Id == i)[0];
    row.deliveryDays = event.target.value;
  }
  updateProduct() {
    this.product.printPrice = this.printPrice;
    let quant: string = "";
    this.product.printPrice.forEach((row, index) => {
      if (row.qunatity !== 0) {
        if (index == 0) {
          quant = `${row.qunatity}`;
        } else {
          quant = `${quant},${row.qunatity}`;
        }
      }
    });
    this.product.orientation = this.productform.controls["orientation"].value;
    this.product.productSize = this.productform.controls["size"].value;
    this.product.productSubcategory = this.productform.controls["subCat"].value;
    this.product.paperGSM = this.productform.controls["paperGSM"].value;
    // this.product.quantities = this.productform.controls["quantities"].value;
    this.product.quantities = quant;
    this.product.productCategory = this.productform.controls[
      "classification"
    ].value;
    this.product.productCode = this.productform.controls["productCode"].value;

    this.product.DesignCommision = this.productform.controls[
      "dCommission"
    ].value;
    this.product.DesignGST = this.productform.controls["dGST"].value;
    this.product.DesignPrice = this.productform.controls["dprice"].value;
    // this.product.PrintCommision = this.productform.controls[
    //   "pCommission"
    // ].value;
    this.product.PrintGST = this.productform.controls["pGST"].value;
    //this.product.PrintPrice = this.productform.controls["pprice"].value;
    // this.product.producPreference = this.productform.controls["preferenece"].value;
    this.product.productDescription = this.productform.controls[
      "description"
    ].value;
    this.product.deliveryFees = this.productform.controls["deliveryFees"].value;
    this.product.deliveryTime = this.productform.controls["deliveryTime"].value;

    if (this.editForm == true) {
      this.product.productsubId = this.selectedProduct["productsubId"];
    } else {
      debugger;
      this.product.productsubId = 0;
      this.product.productId = this.productform.controls["Pname"].value;
    }
    this.spinnerService.show();
    this.admin.updateProduct(this.product).subscribe(
      data => {
        this.updateSuccess = true;
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
      }
    );
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
