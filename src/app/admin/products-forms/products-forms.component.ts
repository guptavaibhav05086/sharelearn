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
  disableSize = false;
  isDisabled = false;
  boolean;
  product = new Productlist();
  options = {
    Positivie: true,
    Negative: false
  };
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
    deliveryTime: new FormControl(""),
    inSqft: new FormControl("No"),
    meetingDuration: new FormControl(""),
    dDesFees: new FormControl(""),
    sourceFileFees: new FormControl(""),
    slotGap: new FormControl("")
  });
  constructor(
    private _validator: ValidatorsService,
    private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    public admin: AdminService
  ) {}

  ngOnInit(): void {
    //debugger;
    let item = new ProductprintPrice();
    if (this.printPriceList == undefined || this.printPriceList.length == 0) {
      this.initializePricingSection(item);
    }
    if (this.editForm == true) {
      console.log(this.selectedProduct);
      item.prodDetailsId = this.selectedProduct.poductDetailsId;
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
        deliveryTime: this.selectedProduct["deliveryTime"],
        inSqft: this.selectedProduct["IsPriceInSqFt"] == true ? "Yes" : "No",
        slotGap: this.selectedProduct["SlotTimeGap"],
        sourceFileFees: this.selectedProduct["sourceFileFees"],
        dDesFees: this.selectedProduct["profDesignerFee"],
        meetingDuration: this.selectedProduct["meetingDuration"]
      });
      let prodPice = this.printPriceList.filter(
        item => item.prodDetailsId == this.selectedProduct.poductDetailsId
      );
      if (prodPice == null || prodPice.length == 0) {
        this.initializePricingSection(item);
      }
      debugger;
      for (let i = 0; i < prodPice.length; i++) {
        this.loadItem(i, prodPice[i]);
      }
    }
  }

  initializePricingSection(item: ProductprintPrice) {
    item.prodDetailsId = 0;
    item.Id = 0;
    item.pricePerUnit = 0;
    item.printCommission = 0;
    item.qunatity = 0;
    this.printPrice.push(item);
  }
  loadItem(index, row) {
    //debugger;
    let item = new ProductprintPrice();
    item.prodDetailsId = this.selectedProduct.poductDetailsId;
    item.Id = index;
    item.pricePerUnit = row.pricePerUnit;
    item.printCommission = row.printCommission;
    item.qunatity = row.qunatity;
    item.deliveryDays = row.deliveryDays;
    this.printPrice.push(item);

    console.log(this.printPrice);
  }
  createItem(index) {
    //debugger;
    let item = new ProductprintPrice();
    let itempre = this.printPrice.filter(item => item.Id == index);
    if (itempre != null && itempre.length > 0) {
      if (
        itempre[0].pricePerUnit > 0 &&
        itempre[0].qunatity > 0 &&
        itempre[0].printCommission > 0 &&
        itempre[0].deliveryDays > 0
      ) {
      } else {
        alert("Provide Values for previous item correctly");
        return;
      }
    }

    //item.prodDetailsId = this.selectedProduct.poductDetailsId;
    item.Id = index + 1;
    item.pricePerUnit = 0;
    item.printCommission = 0;
    item.qunatity = 0;
    this.printPrice.push(item);

    console.log(this.printPrice);
  }
  removeItem(index) {
    //debugger;
    this.printPrice = this.printPrice.filter(i => i.Id != index);
  }
  setpriceprint(event, i) {
    //debugger;
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
  freezSize() {
    if (this.productform.controls["inSqft"].value == "Yes") {
      this.disableSize = true;
      this.productform.patchValue({
        size: "L x W (cutomised)"
      });
    } else {
      this.disableSize = false;
      this.productform.patchValue({
        size: ""
      });
    }
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
    //
    if (this.productform.controls["inSqft"].value == "Yes") {
      this.product.quantities = this.productform.controls["quantities"].value;
    } else {
      this.product.quantities = quant;
    }

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
    this.product.IsPriceInSqFt =
      this.productform.controls["inSqft"].value == "Yes" ? true : false;
    this.product.meetingDuration = this.productform.controls[
      "meetingDuration"
    ].value;
    this.product.sourceFileFees = this.productform.controls[
      "sourceFileFees"
    ].value;
    this.product.SlotTimeGap = this.productform.controls["slotGap"].value;
    this.product.profDesignerFee = this.productform.controls["dDesFees"].value;
    if (this.editForm == true) {
      this.product.productsubId = this.selectedProduct["productsubId"];
    } else {
      //debugger;
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
    //debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    //debugger;
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
        //debugger;
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
