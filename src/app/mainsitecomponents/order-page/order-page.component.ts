import { Component, OnInit, ElementRef, Inject } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";
import { HelperService } from "src/app/services/helper.service";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ValidatorsService } from "src/app/services/validators.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PriceDescriptionComponent } from "../price-description/price-description.component";
import { TermsConditionsComponent } from "../terms-conditions/terms-conditions.component";
import { Discounts } from "src/app/Models/discounts";
import { DOCUMENT } from "@angular/common";
import { LoginService } from "src/app/services/login.service";
@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.css"]
})
export class OrderPageComponent implements OnInit {
  paramSelProduct = "";
  paramSelSubCat = "";
  minDate: NgbDateStruct;
  model: NgbDateStruct;
  //displayOrderForm=false;
  selectedProductImage: string;
  productList;
  products;
  printPrice;
  description;
  selectedCategory;
  checkedProduct;
  displayCategory = false;
  displaySpecs = false;
  displayMeetings = false;
  displayprinter = false;
  displayDesigner = false;
  displayDesignOnly = false;
  displaysummary = false;
  displaycartMessage = false;
  displayLenghtWidth = false;
  Servicable = false;
  isEditOrder = false;
  cartItemId = 0;
  fileError = false;
  displayeproceed = true;
  disableAllUploadButtons = false;
  isPhotoUrlValid: boolean;
  discountPrice: Array<Discounts>;
  arrLnW = new Array<number>();
  maxGap = 0;
  disbaleCheckout = false;
  disableCart = false;
  uploadedFileNames = {
    product: ".jpg,.png,.jpeg,pdf format",
    productServerFile: "",
    image1: ".jpg,.png,.jpeg,pdf format",
    image2: ".jpg,.png,.jpeg,pdf format",
    image3: ".jpg,.png,.jpeg,pdf format",
    image4: ".jpg,.png,.jpeg,pdf format",
    content: "Content File in .doc,docx,.pdf format",
    contentServerFile: "",
    IsImageUploaded: false,
    contentValidation: false,
    IsproductRefUploaded: false,
    displayErrororbutton: false,
    displayLoadingProductGif: false,
    displayLoadingContentGif: false,
    IscontentUploaded: false,
    displayReadOnlyError: false
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
  orderPrice = {
    price: 0,
    deliveryFee: 0,
    GST: 0,
    Total: 0,
    designCost: 0,
    printCost: 0,
    baseDesignPrice: 0,
    designGST: 0,
    printGST: 0,
    totalDesignCost: 0,
    totalPrintCost: 0,
    deliveryDays: 0,
    professiondesignerFees: 0,
    professiondesignerFeesAfterCommision: 0,
    sourceFileFees: 0,
    discount: 0,
    discountPerc: 0,
    discountedTotal: 0,
    designerCost: 0,
    printerCost: 0,
    printGSTPct: 0,
    DesignGSTPct: 0
  };
  trackCartOrderCount = {
    design: 0,
    print: 0
  };
  meetingSlots = [
    "10:00 AM -11:00 AM",
    "11:00 AM -12:00 AM",
    "12:00 AM -1:00 PM",
    "1:00 PM -2:00 PM",
    "2:00 PM -3:00 PM",
    "3:00 PM -4:00 PM",
    "4:00 PM -5:00 PM",
    "5:00 PM -6:00 PM",
    "6:00 PM -7:00 PM",
    "7:00 PM -8:00 PM",
    "8:00 PM -9:00 PM",
    "9:00 PM -10:00 PM"
  ];
  addImage(i) {
    //debugger;
    if (this.disableAllUploadButtons == true) {
      return;
    }
    if (this.imageUpload.length < 4) {
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
  }
  removeImage(i) {
    if (this.disableAllUploadButtons == true) {
      return;
    }
    if (i == 1) {
      let item = this.imageUpload.filter(item => item.id == i)[0];
      item.displayFileName = false;
    } else {
      this.imageUpload = this.imageUpload.filter(item => item.id != i);
    }
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
      if (file.size > 20000000) {
        this.isPhotoUrlValid = false;
        alert("File size is more than 20MB");
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
      if (file.size > 20000000) {
        this.isPhotoUrlValid = false;
        alert("file size is more than 20 MB");

        return false;
      } else {
        this.isPhotoUrlValid = true;
      }
    }

    return true;
  }
  stopDefault(event) {
    event.preventDefault();
  }
  uploadLogoImage(images: FileList, name: string, itemId: number) {
    debugger;
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
    this.custService.uploadUserImage(formData).subscribe(
      data => {
        //this.spinner.hide();
        debugger;
        item.displayLoadingGif = false;
        item.displayFileName = true;
        console.log(data);
        item.serverFileName = data.toString();
        //alert("File Uploaded Successfully");
        this.uploadedFileNames[name] = item;
        this.fileError = false;
        this.uploadedFileNames.IsImageUploaded = true;
        this.uploadedFileNames.displayReadOnlyError = false;
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
  uploadGSTCertificate(images: FileList, name: string) {
    //debugger;
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
    if (name == "content") {
      this.uploadedFileNames.displayLoadingContentGif = true;
    } else {
      this.uploadedFileNames.displayLoadingContentGif = false;
    }
    this.custService.uploadUserImage(formData).subscribe(
      data => {
        this.spinner.hide();
        ////debugger;
        console.log(data);
        //alert("File Uploaded Successfully");
        //this.uploadedFileNames[name] = data;
        this.uploadedFileNames[name] = userImage.name;
        this.fileError = false;
        this.uploadedFileNames.IsImageUploaded = true;
        //this.selectedFileName = userImage.name;
        if (name == "content") {
          this.uploadedFileNames.contentValidation = true;
          this.uploadedFileNames.displayLoadingContentGif = false;
          this.uploadedFileNames.IscontentUploaded = true;
          this.uploadedFileNames.contentServerFile = data.toString();
        }
        if (name == "product") {
          this.uploadedFileNames.IsproductRefUploaded = true;
          this.uploadedFileNames.displayErrororbutton = false;
          this.uploadedFileNames.productServerFile = data.toString();
        } else {
          //this.uploadedFileNames.IsproductRefUploaded=false;
        }
        this.uploadedFileNames.displayLoadingProductGif = false;
      },
      err => {
        this.spinner.hide();
        ////debugger;
        this.fileError = true;
        alert("Issue in file upload please contact admin");
        if (name == "content") {
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
  orderForm = new FormGroup({
    type: new FormControl(""),
    category: new FormControl(""),
    subCategory: new FormControl("", [Validators.required]),
    orientation: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    GSM: new FormControl("0", [Validators.required]),
    quantities: new FormControl("0", [Validators.required]),
    // meetingDate: new FormControl({}),
    meetingSlot: new FormControl(""),
    professionDesigner: new FormControl(false),
    sourceFile: new FormControl(false),
    sourceFileSpecs: new FormControl(false),
    pinCode: new FormControl("", [Validators.required]),
    GSTNumber: new FormControl("", [
      this._validator.patternValidation(
        /^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
      )
    ]),
    BillingName: new FormControl(""),
    purpose: new FormControl("", [Validators.required]),
    length: new FormControl(""),
    width: new FormControl(""),
    designcontent: new FormControl(""),
    disableCat: new FormControl(""),
    disableType: new FormControl(""),
    tDesign: new FormControl(false),
    tPrinter: new FormControl(false),
    tPrinterPaperSize: new FormControl(false),
    tPrinterGSM: new FormControl(false)
  });

  addToCart() {
    //debugger;
    if (!this.acceptTerms()) {
      return;
    }
    let id = 1;
    // if (this.isEditOrder) {
    //   this.custService.deletItemFromCart(this.cartItemId);
    //   id = this.cartItemId;
    // }
    if (
      this.custService.getLocalStorageCart() != null &&
      this.custService.getLocalStorageCart().length > 0
    ) {
      let cartLastItems = this.custService.getLocalStorageCart()[
        this.custService.getLocalStorageCart().length - 1
      ];
      id = parseInt(cartLastItems.id) + 1;
    }
    if (this.isEditOrder) {
      this.custService.deletItemFromCart(this.cartItemId);
      //id = this.cartItemId;
    }
    let selItem = this.productList.filter(
      item =>
        item.productSubcategory == this.orderForm.controls["subCategory"].value
    )[0];
    if (
      this.checkCartValidation(this.orderForm.controls["type"].value) == false
    ) {
      return;
    }
    if (
      this.checkTimeGapValidation(this.maxGap, selItem.SlotTimeGap) == false
    ) {
      return;
    }

    let cartItem = {
      id: id,
      type: this.orderForm.controls["type"].value,

      GSTNumber: this.orderForm.controls["GSTNumber"].value,
      BillingName: this.orderForm.controls["BillingName"].value,
      uploadedimages: this.uploadedFileNames,
      logoImage: this.imageUpload,
      content: this.orderForm.controls["designcontent"].value,
      industry: this.orderForm.controls["purpose"].value,
      IsPriceInSqFt: selItem.IsPriceInSqFt,
      selLength: this.orderForm.controls["length"].value,
      selWidth: this.orderForm.controls["width"].value,
      category: [
        {
          name: this.orderForm.controls["category"].value,
          prodImage: this.selectedProductImage,
          specs: {
            subCategory: this.orderForm.controls["subCategory"].value,
            orientation: this.orderForm.controls["orientation"].value,
            size: this.orderForm.controls["size"].value,
            paperGSM: this.orderForm.controls["GSM"].value,
            quantity: this.orderForm.controls["quantities"].value,
            pinCode: this.orderForm.controls["pinCode"].value
          },
          meetingDetails: {
            day: this.minDate,
            slot: this.orderForm.controls["meetingSlot"].value,
            timeGap: selItem.SlotTimeGap,
            meetingDuration: selItem.meetingDuration
          },
          price: {
            price: this.orderPrice.price,
            deliveryFee: this.orderPrice.deliveryFee,
            GST: this.orderPrice.GST,
            Total: this.orderPrice.Total,
            baseDesignPrice: this.orderPrice.baseDesignPrice,
            designGST: this.orderPrice.designGST,
            printGST: this.orderPrice.printGST,
            printGSTPct: this.orderPrice.printGSTPct,
            designGSTPct: this.orderPrice.DesignGSTPct,
            totalDesignCost: this.orderPrice.totalDesignCost,
            totalPrintCost: this.orderPrice.totalPrintCost,
            deliveryDays: this.orderPrice.deliveryDays,
            professiondesignerFees: this.orderPrice.professiondesignerFees,
            professiondesignerFeesAfterCommision: this.orderPrice
              .professiondesignerFeesAfterCommision,
            sourceFileFees: this.orderPrice.sourceFileFees,

            discountPerc: this.orderPrice.discountPerc,
            designerCost: this.orderPrice.designerCost,
            printerCost: this.orderPrice.printerCost,
            printCost: this.orderPrice.printCost,
            discount: this.orderPrice.discount,
            discountedTotal: this.orderPrice.discountedTotal
          },
          professionalDesigner: this.orderForm.controls["professionDesigner"]
            .value,
          sourceFile: this.orderForm.controls["sourceFileSpecs"].value,
          purpose: this.orderForm.controls["purpose"].value
        }
      ]
    };
    debugger;
    localStorage.setItem("cart", "");
    this.custService.addItemUserOrdersList(cartItem);
    let param;
    if (this.isEditOrder) {
      param = { queryParams: { orderpage: true, editItem: this.cartItemId } };
    } else {
      param = { queryParams: { orderpage: true } };
    }
    this._helper.navigateToPathWithparams("/cart", param);
    //this._helper.navigateToPath("/cart");
    this.displaycartMessage = true;
  }
  scrollToElement($element): void {
    console.log($element);

    $element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
  proSpec = {
    orientation: [],
    size: [],
    gsm: [],
    quantities: [],
    subcat: [],
    displayQuant: [],
    dsiplaygsm: [],
    displayOrientation: [],
    displaySubcat: [],
    displaySize: []
  };
  constructor(
    private admin: AdminService,
    private custService: CustomerService,
    private _helper: HelperService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _validator: ValidatorsService,
    private modalService: NgbModal,
    private elRef: ElementRef,
    private _login: LoginService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  acceptTerms() {
    if (this.displayprinter == true) {
      if (this.orderForm.controls["tPrinter"].value == false) {
        alert("Accept Terms and Conditions to proceed.");
        return false;
      }
      if (this.orderForm.controls["tPrinterPaperSize"].value == false) {
        alert("Accept Terms and Conditions to proceed.");
        return false;
      }
      if (this.orderForm.controls["tPrinterGSM"].value == false) {
        alert("Accept Terms and Conditions to proceed.");
        return false;
      }
    }
    if (this.displayDesignOnly == true) {
      if (this.orderForm.controls["tDesign"].value == false) {
        alert("Accept Terms and Conditions to proceed.");
        return false;
      }
    }
    return true;
  }
  openTermCondition(type, e) {
    e.preventDefault();
    //this._helper.navigateToPath("/terms");
    window.open("/terms", "_blank");
    // let modelRef = this.modalService.open(TermsConditionsComponent);
    // modelRef.componentInstance.type = type;
    // modelRef.result.then(data => {
    //   //debugger;
    //   console.log(data);

    // });
  }
  clearContentImage() {
    this.uploadedFileNames.content = "";
  }
  openPriceDescription(e) {
    e.preventDefault();
    let modelRef = this.modalService.open(PriceDescriptionComponent);
    modelRef.componentInstance.orderPrice = this.orderPrice;
    modelRef.componentInstance.disDesig = this.displayDesigner;
    modelRef.componentInstance.disPrinter = this.displayprinter;
    modelRef.result.then(data => {
      //debugger;
      console.log(data);
    });
  }

  proceedOrder($element: any) {
    debugger;
    if (this.orderForm.controls["type"].value == "Design Only") {
      this.orderForm.patchValue({
        quantities: 0,
        GSM: 0
      });
    }
    Object.keys(this.orderForm.controls).forEach(field => {
      // {1}
      const control = this.orderForm.get(field); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    });
    if (
      !this.orderForm.valid ||
      this.Servicable == false ||
      (this.orderForm.controls["type"].value != "Print Only" &&
        this.uploadedFileNames.contentValidation == false) ||
      (this.displayDesigner &&
        this.uploadedFileNames.IsproductRefUploaded == false) ||
      (this.orderForm.controls["type"].value == "Print Only" &&
        this.imageUpload[0].serverFileName == "")
    ) {
      if (this.uploadedFileNames.IsproductRefUploaded == false) {
        this.uploadedFileNames.displayErrororbutton = true;
      } else {
        this.uploadedFileNames.displayErrororbutton = false;
      }
      if (
        this.orderForm.controls["type"].value == "Print Only" &&
        this.imageUpload[0].serverFileName == ""
      ) {
        this.uploadedFileNames.displayReadOnlyError = true;
      } else {
        this.uploadedFileNames.displayReadOnlyError = false;
      }

      console.log(this.uploadedFileNames);
      return;
    }
    //debugger;
    this.displayMeetings = false;
    this.displaysummary = true;
    // if (this.orderForm.controls["type"].value == "Print Only") {
    //   this.displayMeetings = false;
    //   this.displaysummary = true;
    // } else {
    //   this.displayMeetings = true;
    // }
    ////debugger;
    this.calculatePrice(
      this.orderForm.controls["type"].value,
      this.orderForm.controls["subCategory"].value,
      this.orderForm.controls["orientation"].value,
      this.orderForm.controls["size"].value
    );
    console.log(this.orderPrice);
    this.scrollToElement($element);
    this.orderForm.disable();
    this.disableAllUploadButtons = true;
    this.orderForm.controls["BillingName"].enable();
    this.orderForm.controls["GSTNumber"].enable();
    this.orderForm.controls["tPrinter"].enable();
    this.orderForm.controls["tDesign"].enable();
    this.orderForm.controls["tPrinterPaperSize"].enable();
    this.orderForm.controls["tPrinterGSM"].enable();
    this.displayeproceed = false;
    //TODO Calculate Price method
  }
  editSpecification() {
    this.orderForm.enable();
    this.disableAllUploadButtons = false;
    this.displayeproceed = true;
    this.displaysummary = false;
    this.orderForm.controls["disableCat"].disable();
    this.orderForm.controls["disableType"].disable();
  }
  dateSet() {
    if (
      //this.orderForm.controls["meetingDate"].value != "" &&
      this.orderForm.controls["meetingSlot"].value == ""
    ) {
      this.displaysummary = false;
    } else {
      this.displaysummary = true;
    }
    //alert(this.orderForm.controls["meetingDate"].value);
    //alert(this.orderForm.controls["meetingSlot"].value);
    //alert("Date set is called");
  }
  checkout() {
    if (!this.acceptTerms()) {
      return;
    }
    //this.addToCart();
    let param = { queryParams: { orderpage: true } };
    this._helper.navigateToPathWithparams("/cart", param);
    //this._helper.navigateToPath("/cart");
    // if(this.orderForm.controls["type"].value =="Design Only"){
    //   this._helper.navigateToPath("/cart");
    // }else{
    //   this._helper.navigateToPath("/selectAddress");
    // }
  }
  resetControls() {
    this.uploadedFileNames = {
      product: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      content: "",
      IsImageUploaded: false,
      contentValidation: false,
      IsproductRefUploaded: false,
      displayErrororbutton: false,
      displayLoadingProductGif: false,
      displayLoadingContentGif: false,
      IscontentUploaded: false,
      displayReadOnlyError: false,
      productServerFile: "",
      contentServerFile: ""
    };
    this.imageUpload = [
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
    this.orderPrice = {
      price: 0,
      deliveryFee: 0,
      GST: 0,
      Total: 0,
      designCost: 0,
      printCost: 0,
      designGST: 0,
      printGST: 0,
      totalDesignCost: 0,
      totalPrintCost: 0,
      deliveryDays: 0,
      professiondesignerFees: 0,
      professiondesignerFeesAfterCommision: 0,
      sourceFileFees: 0,
      baseDesignPrice: 0,
      discount: 0,
      discountPerc: 0,
      discountedTotal: 0,
      designerCost: 0,
      printerCost: 0,
      printGSTPct: 0,
      DesignGSTPct: 0
    };
    this.orderForm.patchValue({
      category: "",
      GSTNumber: "",
      BillingName: "",
      subCategory: "",
      orientation: "",
      size: "",
      GSM: "",
      quantities: "",
      meetingSlot: "",
      professionDesigner: false,
      sourceFile: false,
      purpose:
        this.orderForm.controls["type"].value == "Print Only"
          ? "Print Only"
          : "",
      designcontent: ""
    });

    this.displaySpecs = false;
    this.displayMeetings = false;
    this.displaysummary = false;
    this.displayLenghtWidth = false;

    Object.keys(this.orderForm.controls).forEach(field => {
      // {1}
      const control = this.orderForm.get(field);
      control.markAsUntouched(); // {2}
      //control.markAsTouched({ onlySelf: false });       // {3}
    });
  }
  contextValidation() {
    if (
      this.orderForm.controls["designcontent"].value != "" &&
      this.orderForm.controls["designcontent"].value != null
    ) {
      this.uploadedFileNames.contentValidation = true;
    }
  }
  checkTimeGapValidation(maxGap, selItemGap) {
    ////debugger;
    let cartList = this.custService.getLocalStorageCart();
    let calGap = selItemGap;
    if (cartList != null) {
      cartList.forEach(item => {
        let mD = item.category[0].meetingDetails;
        calGap = calGap + mD.timeGap;
      });
    }

    if (calGap > maxGap) {
      alert(
        "This Item can not be added to Cart because of meeting slot time constraints"
      );
      return false;
    }
    return true;
  }
  checkCartValidation(category) {
    ////debugger;
    let cartList = this.custService.getLocalStorageCart();
    let cartItemsType = null;
    let validateCount = 0;
    if (cartList != null) {
      let DandPType = cartList.filter(item => item.type == "Design And Print");
      let Ptype = cartList.filter(item => item.type == "Design Only");
      let dtype = cartList.filter(item => item.type == "Print Only");
      if (category != "Design And Print") {
        cartItemsType = cartList.filter(item => item.type == category);
        if (DandPType != null && cartItemsType != null) {
          validateCount = DandPType.length + cartItemsType.length;
        } else if (DandPType != null) {
          validateCount = DandPType.length;
        } else if (cartItemsType != null) {
          validateCount = cartItemsType.length;
        }
        if (validateCount >= 3) {
          alert(
            "Customer Can order upto 3 Items per Category.Please Clear your cart to add item of this type in cart"
          );
          return false;
        }
      } else {
        ////debugger;
        let validateOrder = {
          vDNP: 0,
          vDNPP: 0,
          vDNPD: 0
        };
        validateOrder.vDNP += DandPType != null ? DandPType.length : 0;
        if (validateOrder.vDNP >= 3) {
          alert(
            "Customer Can order upto 3 Items per Category.Please Clear your cart to add item of this type in cart"
          );
          return false;
        }
        validateOrder.vDNPP =
          validateOrder.vDNP + (Ptype != null ? Ptype.length : 0);
        if (validateOrder.vDNPP >= 3) {
          alert(
            "Customer Can order upto 3 Items per Category.Please Clear your cart to add item of this type in cart"
          );
          return false;
        }
        validateOrder.vDNPD =
          validateOrder.vDNP + dtype != null ? dtype.length : 0;
        if (validateOrder.vDNPD >= 3) {
          alert(
            "Customer Can order upto 3 Items per Category.Please Clear your cart to add item of this type in cart"
          );
          return false;
        }
      }
    }
    return true;
  }
  showCategory(category, $element) {
    debugger;
    this.addRemoveOverflow(false);
    if (this.displayeproceed == false) {
      return;
    }
    this.orderForm.enable();
    this.editSpecification();
    if (!this.isEditOrder) {
      if (this.checkCartValidation(category) == false) {
        return;
      }
    }

    ////debugger;
    this.resetControls();
    this.selectedCategory = this.products.filter(
      item => item.category == category || item.category == "Design And Print"
    );
    if (category == "Design And Print" || category == "Print Only") {
      this.displayDesignOnly = false;
      this.displayprinter = true;
      this.displayDesigner = false;
      this.Servicable = false;
      this.uploadedFileNames.contentValidation = true;
      this.orderForm.patchValue({
        pinCode: "",
        purpose: "Print Only"
      });
      if (category == "Design And Print") {
        this.displayDesigner = true;
        this.uploadedFileNames.contentValidation = false;
        this.orderForm.patchValue({
          purpose: ""
        });
      }
    } else {
      this.displayprinter = false;
      this.displayDesignOnly = true;
      this.displayDesigner = true;
      this.orderForm.patchValue({
        pinCode: "0",
        purpose: ""
      });
      this.Servicable = true;
    }
    this.displayCategory = true;
    this.orderForm.patchValue({
      type: category,
      category: this.paramSelProduct
    });
    // try{
    //   //debugger;
    //   this.scrollToElement($element);
    // }catch(err){

    // }
    console.log(this.selectedCategory);
    //subCategory
    if (this.paramSelProduct != null && this.paramSelProduct != "") {
      let item = this.selectedCategory.filter(
        a => a.value == this.paramSelProduct
      );
      if (item.length != 0) {
        item[0].isSelected = true;
        let elemTime = this.document.getElementById("specs");
        this.selectedProduct(item[0].value, elemTime);
        this.scrollToElement(elemTime);
        if (this.paramSelSubCat != null && this.paramSelSubCat != "") {
          this.orderForm.patchValue({
            subCategory: this.paramSelSubCat
          });
          this.selectedSubcategory(null);
        }
      } else {
        try {
          debugger;
          this.scrollToElement($element);
        } catch (err) {}
      }
    } else {
      try {
        debugger;
        this.scrollToElement($element);
      } catch (err) {}
    }
    // this.selectedCategory.sort((a, b) => a.value.localeCompare(b.value));
  }
  ngOnInit(): void {
    debugger;
    let Tokendetails = this._login.getUserToken();
    // if (
    //   this.isEditOrder != true &&
    //   (Tokendetails.Token != null ||
    //     Tokendetails.Token != undefined ||
    //     Tokendetails.Token != "")
    // ) {
    //   localStorage.setItem("cart", null);
    // }
    this.spinner.show();
    for (let i = 1; i < 101; i++) {
      this.arrLnW.push(i);
    }
    this.route.queryParams.subscribe(params => {
      debugger;
      console.log(params); // { order: "popular" }
      //this.cartItemId = params.itemId;
      if (params.itemId != undefined) {
        this.cartItemId = params.itemId;
        this.isEditOrder = true;
      } else {
        this.isEditOrder = false;
      }
      if (params.selectedProduct != undefined) {
        this.paramSelProduct = params.selectedProduct;
        this.displaySpecs = false;
        this.displaysummary = false;
        this.displayCategory = false;
        this.addRemoveOverflow(true);
      }
      if (params.selSubCat != undefined) {
        this.paramSelSubCat = params.selSubCat;
      }

      // popular
    });
    if (
      this.isEditOrder != true &&
      (Tokendetails.Token != null ||
        Tokendetails.Token != undefined ||
        Tokendetails.Token != "")
    ) {
      localStorage.setItem("cart", null);
    }
    this.admin.getProducts().subscribe(
      data => {
        this.productList = data["productList"];
        this.productList = this.productList.filter(
          item => item.IsDisabled == false
        );
        this.products = data["products"];
        this.products = this.products.filter(item => item.IsDisabled == false);
        this.printPrice = data["printPrice"];
        this.maxGap = data["maxGap"];
        this.discountPrice = data["discountList"];
        this.custService.discountedPrice = this.discountPrice;
        //debugger;
        //this.displayOrderForm=true;
        this.products.forEach(item => {
          item.isSelected = false;
        });
        console.log(this.products);
        debugger;
        if (this.isEditOrder) {
          this.openEditForm(this.cartItemId);
          this.spinner.hide();
        } else {
          this.addRemoveOverflow(true);
        }
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      }
    );
    let date = new Date();
    let initialDate = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getUTCDate()
    };
    this.minDate = initialDate;
    this.model = initialDate;
    // this.orderForm.patchValue({
    //   meetingDate: initialDate
    // });
  }

  addRemoveOverflow(toggle) {
    if (toggle) {
      // this.document.getElementsByTagName("body")[0].classList.add('overflowBody');
      this.document
        .getElementsByTagName("body")[0]
        .setAttribute("style", "overflow-y: hidden;");
    } else {
      // this.document.getElementsByTagName("body")[0].classList.remove('overflowBody');
      this.document.getElementsByTagName("body")[0].removeAttribute("style");
    }
  }
  openEditForm(id) {
    debugger;
    let cart = this.custService.getLocalStorageCart();
    let editItem = cart.filter(item => item.id == id);

    if (editItem != null) {
      this.showCategory(editItem[0].type, null);
      let elemTime = this.document.getElementById("specs");
      // if(elemTime !=null){

      // }
      this.selectedProduct(editItem[0].category[0].name, elemTime);
      let e = {};
      if (editItem[0].IsPriceInSqFt) {
        e = {
          target: {
            value: "L x W (cutomised)"
          }
        };
      } else {
        e = {
          target: {
            value: editItem[0].category[0].specs.size
          }
        };
      }

      this.selectedSize(e);
      this.orderForm.patchValue({
        type: editItem[0].type,
        category: editItem[0].category[0].name,
        professionDesigner: editItem[0].category[0].professionalDesigner,
        sourceFileSpecs: editItem[0].category[0].sourceFile,
        GSTNumber: editItem[0].GSTNumber,
        BillingName: editItem[0].BillingName,
        subCategory: editItem[0].category[0].specs.subCategory,
        orientation: editItem[0].category[0].specs.orientation,
        size: editItem[0].category[0].specs.size,
        GSM: editItem[0].category[0].specs.paperGSM,
        quantities: editItem[0].category[0].specs.quantity,
        pinCode: editItem[0].category[0].specs.pinCode,
        designcontent: editItem[0].content,
        purpose: editItem[0].industry,
        length: editItem[0].selLength,
        width: editItem[0].selWidth
      });
      this.selectedSubcategory(null);
      this.orderForm.patchValue({
        orientation: editItem[0].category[0].specs.orientation,
        size: editItem[0].category[0].specs.size
      });
      this.Servicable = true;
      this.uploadedFileNames.contentValidation = true;
    }
    console.log(this.orderForm);
    this.imageUpload = editItem[0].logoImage;
    this.imageUpload.forEach(img => (img.displayFileName = true));
    this.uploadedFileNames = editItem[0].uploadedimages;
  }
  selectedProduct(value, $element) {
    if (this.displayeproceed == false) {
      return;
    }
    this.orderForm.patchValue({
      subCategory: ""
    });
    this.resetControls();
    let selItem = this.selectedCategory.filter(item => item.value == value)[0];
    if (selItem != null) {
      this.selectedProductImage = selItem.productImage;
    } else {
      this.selectedProductImage =
        "../../../assets/StudentDashboard/img/download.jpg";
    }

    //disableCat:new FormControl(""),
    this.orderForm.patchValue({
      disableCat: value,
      disableType: this.orderForm.controls["type"].value,
      category: value
    });
    this.orderForm.controls["disableCat"].disable();
    this.orderForm.controls["disableType"].disable();
    this.checkedProduct = this.productList.filter(
      item => item.productName == value
    );
    this.products.forEach(item => {
      if (item.value == value) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });

    if (!this.isEditOrder) {
      this.resetControls();
    }

    this.displaySpecs = true;
    if (this.checkedProduct.IsPriceInSqFt == "Yes") {
      //this.displayLenghtWidth = true;
    } else {
      //this.displayLenghtWidth = false;
    }
    this.proSpec.subcat = [];
    this.proSpec.size = [];
    this.proSpec.orientation = [];
    this.proSpec.quantities = [];
    this.proSpec.gsm = [];
    this.proSpec.dsiplaygsm = [];
    this.proSpec.displaySize = [];
    this.proSpec.displaySubcat = [];
    this.description = "";
    this.displaycartMessage = false;
    this.checkedProduct.forEach((element, index) => {
      if (element.productDescription != null) {
        this.description = element.productDescription;
      }

      this.proSpec.subcat.push({
        subcat: element.productSubcategory,
        isPriceSqFt: element.IsPriceInSqFt
      });
      if (element.IsPriceInSqFt != true) {
        this.proSpec.size.push(element.productSize);
      }

      this.proSpec.orientation.push({
        subcat: element.productSubcategory,
        orientation: element.orientation
      });
      this.proSpec.quantities.push({
        size: element.productSize,
        qunat: element.quantities
      });
      this.proSpec.gsm.push({
        gsm: element.paperGSM,
        subcat: element.productSubcategory
      });

      let checkSubCat = this.proSpec.displaySubcat.filter(
        item => item["subcat"] == element.productSubcategory
      );
      if (checkSubCat.length == 0) {
        this.proSpec.displaySubcat.push({
          subcat: element.productSubcategory
        });
      }
    });
    //debugger;
    this.proSpec.gsm = [...new Set(this.proSpec.gsm)];
    this.proSpec.orientation = [...new Set(this.proSpec.orientation)];
    this.proSpec.quantities = [...new Set(this.proSpec.quantities)];
    this.proSpec.size = [...new Set(this.proSpec.size)];
    this.proSpec.subcat = [...new Set(this.proSpec.subcat)];
    this.proSpec.displaySubcat = [...new Set(this.proSpec.displaySubcat)];

    this.orderForm.patchValue({
      category: value
    });
    console.log(this.proSpec);
    //delay(5000);
    //this.proSpec.displayQuant=this.proSpec.quantities.sp
    // if (!this.isEditOrder ) {
    //   this.scrollToElement($element);
    // }
    try {
      this.scrollToElement($element);
    } catch (err) {}
  }
  selectedCustomizedSize() {}
  selectedSubcategory(event) {
    debugger;

    let selproducts = this.productList.filter(
      item =>
        item.productSubcategory == this.orderForm.controls["subCategory"].value
    );
    if (
      !this.isEditOrder &&
      this.checkTimeGapValidation(this.maxGap, selproducts[0].SlotTimeGap) ==
        false
    ) {
      return;
    }
    this.proSpec.displaySize = [];
    this.proSpec.dsiplaygsm = [];
    selproducts.forEach(element => {
      let checkGSM = this.proSpec.dsiplaygsm.filter(
        item => item.gsm == element.paperGSM
      );
      if (checkGSM.length == 0) {
        this.proSpec.dsiplaygsm.push({ gsm: element.paperGSM });
      }
      let checkSize = this.proSpec.displaySize.filter(
        item => item == element.productSize
      );
      if (checkSize.length == 0) {
        this.proSpec.displaySize.push(element.productSize);
      }
    });
    console.log(this.proSpec.quantities);
    // this.proSpec.dsiplaygsm = this.proSpec.gsm.filter(
    //   item => item.subcat == this.orderForm.controls["subCategory"].value
    // );
    let selItem = this.proSpec.subcat.filter(
      item => item.subcat == this.orderForm.controls["subCategory"].value
    )[0];
    let selOrien = this.proSpec.orientation.filter(
      item => item.subcat == this.orderForm.controls["subCategory"].value
    )[0];
    this.proSpec.displayOrientation = selOrien.orientation.split(",");
    if (selItem.isPriceSqFt == true) {
      this.displayLenghtWidth = true;
      this.orderForm.patchValue({
        size: "NA"
      });
      let selctedquant = this.proSpec.quantities.filter(
        item => item.size == "L x W (cutomised)"
      );
      if (selctedquant != null) {
        this.proSpec.displayQuant = selctedquant[0].qunat.split(",");
        this.orderForm.patchValue({
          size: "NA"
        });
      } else {
        this.orderForm.patchValue({
          size: ""
        });
      }
    } else {
      this.displayLenghtWidth = false;
    }
    //debugger;
    //  this.orderForm.patchValue({
    //   orientation: ""
    // });
    if (this.orderForm.controls["disableType"].value == "Print Only") {
      this.orderForm.patchValue({
        orientation: "NA"
      });
    } else {
      this.orderForm.patchValue({
        orientation: ""
      });
    }
  }
  selectedSize(e) {
    //debugger;
    let val = e.target.value;
    if (this.proSpec.quantities != null) {
      let quant = this.proSpec.quantities.filter(item => item.size == val)[0];
      if (quant.qunat != null && quant.qunat != undefined)
        this.proSpec.displayQuant = quant.qunat.split(",");
    }
    if (this.orderForm.controls["type"].value == "Design Only") {
      this.orderForm.patchValue({
        quantities: 0,
        GSM: 0
      });
    }
    console.log(this.orderForm);
  }

  checkServicableArea() {
    this.admin
      .checkPincodes(this.orderForm.controls["pinCode"].value)
      .subscribe(
        data => {
          if (!data) {
            this.Servicable = false;
            alert("We are not serving in this area yet.");
          } else {
            this.Servicable = true;
          }
          console.log(data);
        },
        err => {}
      );
  }

  calculatePrice(pCat, pSubcat, orien, size) {
    ////debugger;
    let prod;
    let selItem = this.proSpec.subcat.filter(item => item.subcat == pSubcat)[0];

    if (selItem.isPriceSqFt == true) {
      prod = this.productList.filter(
        item =>
          (item.productCategory == pCat ||
            item.productCategory == "Design And Print") &&
          item.productSubcategory == pSubcat
      );
    } else {
      prod = this.productList.filter(
        item =>
          (item.productCategory == pCat ||
            item.productCategory == "Design And Print") &&
          item.productSubcategory == pSubcat &&
          item.productSize == size
      );
    }

    if (prod != null && prod.length > 0) {
      let item = prod[0];
      if (pCat == "Design And Print") {
        this.calculatepriceDesign(item);
        if (selItem.isPriceSqFt == true) {
          this.calculatepriceprintPerSqFt(prod);
        } else {
          this.calculatepriceprint(prod);
        }

        this.orderPrice.deliveryFee = item.deliveryFees;
      } else if (pCat == "Print Only") {
        if (selItem.isPriceSqFt == true) {
          this.calculatepriceprintPerSqFt(prod);
        } else {
          this.calculatepriceprint(prod);
        }
        this.orderPrice.deliveryFee = item.deliveryFees;
      } else if (pCat == "Design Only") {
        this.calculatepriceDesign(item);
      }
    }
    this.orderPrice.Total = Math.round(
      this.orderPrice.totalDesignCost + this.orderPrice.totalPrintCost
    );
    this.orderPrice.GST = Math.round(
      this.orderPrice.printGST + this.orderPrice.designGST
    );
    this.orderPrice.price = Math.round(
      this.orderPrice.designCost + this.orderPrice.printCost
    );
    //debugger;
    let totalWithoutDeliveryFees =
      this.orderPrice.totalDesignCost + this.orderPrice.totalPrintCost;
    this.orderPrice.discountPerc = this.getDiscountDetails(
      totalWithoutDeliveryFees
    );
    this.orderPrice.discount = Math.round(
      totalWithoutDeliveryFees * (this.orderPrice.discountPerc / 100)
    );
    this.orderPrice.discountedTotal =
      totalWithoutDeliveryFees - this.orderPrice.discount;

    console.log(this.orderPrice);
  }
  getDiscountDetails(cartValue) {
    debugger;
    let discountPer = 0;
    let max = 0;
    this.discountPrice.forEach(element => {
      let cVal = parseFloat(element.CartAmount);
      if (cartValue >= cVal && cVal > max) {
        discountPer = parseFloat(element.DiscountPercentage);
        max = cVal;
      }
    });
    return discountPer;
    //this.dis
  }
  calculatepriceDesign(item) {
    //debugger;
    if (this.orderForm.controls["professionDesigner"].value == true) {
      this.orderPrice.professiondesignerFees = item.profDesignerFee;
      this.orderPrice.professiondesignerFeesAfterCommision = Math.round(
        item.profDesignerFee -
          item.profDesignerFee * (item.DesignCommision / 100)
      );
    } else {
      this.orderPrice.professiondesignerFees = 0;
      this.orderPrice.professiondesignerFeesAfterCommision = 0;
    }
    if (this.orderForm.controls["sourceFileSpecs"].value == true) {
      this.orderPrice.sourceFileFees = item.sourceFileFees;
    } else {
      this.orderPrice.sourceFileFees = 0;
    }
    this.orderPrice.baseDesignPrice = Math.round(
      item.DesignPrice + (item.DesignCommision / 100) * item.DesignPrice
    );
    let designCost =
      this.orderPrice.baseDesignPrice +
      this.orderPrice.professiondesignerFees +
      this.orderPrice.sourceFileFees;
    this.orderPrice.designerCost = item.DesignPrice;
    let designGST = designCost * (item.DesignGST / 100);
    let totalDesignCost = designCost + designGST;
    this.orderPrice.designCost = Math.round(designCost);
    this.orderPrice.designGST = Math.round(designGST);
    this.orderPrice.totalDesignCost = Math.round(totalDesignCost);
    this.orderPrice.DesignGSTPct = item.DesignGST / 100;
  }
  calculatepriceprint(item) {
    ////debugger;
    let quant = this.orderForm.controls["quantities"].value;
    item = item.filter(i => i.paperGSM == this.orderForm.controls["GSM"].value);
    if (item != null && item.length > 0) {
      let pricesdata = this.printPrice.filter(
        a => a.prodDetailsId == item[0].poductDetailsId && a.qunatity == quant
      );
      if (pricesdata != null) {
        let itemPrice = pricesdata[0];
        let pCost =
          (itemPrice.pricePerUnit +
            (itemPrice.printCommission / 100) * itemPrice.pricePerUnit) *
          quant;
        let gstPercentage = item[0].PrintGST / 100;
        let pGST = pCost * gstPercentage;
        let totalPrintCost = pCost + pGST;
        this.orderPrice.printerCost = Math.round(
          itemPrice.pricePerUnit * quant +
            itemPrice.pricePerUnit * quant * gstPercentage
        );
        this.orderPrice.printGST = Math.round(pGST);
        this.orderPrice.printCost = Math.round(pCost);
        this.orderPrice.totalPrintCost = Math.round(totalPrintCost);
        this.orderPrice.deliveryDays = itemPrice.deliveryDays;
        this.orderPrice.printGSTPct = gstPercentage;
      }
    } else {
      this.orderPrice.printGST = 0;
      this.orderPrice.printCost = 0;
      this.orderPrice.totalPrintCost = 0;
    }
  }
  calculatepriceprintPerSqFt(item) {
    ////debugger;
    let quant = this.orderForm.controls["quantities"].value;
    let selectedSqft =
      this.orderForm.controls["length"].value *
      this.orderForm.controls["width"].value *
      quant;
    this.orderForm.patchValue({
      size: selectedSqft
    });
    item = item.filter(i => i.paperGSM == this.orderForm.controls["GSM"].value);
    if (item != null && item.length > 0) {
      // let pricesdata = this.printPrice.filter(
      //   a => a.prodDetailsId == item[0].poductDetailsId && selectedSqft > a.qunatity && selectedSqft < a.qunatity
      // );
      let pricesdata = this.printPrice
        .filter(
          i =>
            i.qunatity > selectedSqft &&
            i.prodDetailsId == item[0].poductDetailsId
        )
        .sort((a, b) => a.quantity - b.quantity);
      if (pricesdata != null) {
        let itemPrice = pricesdata[0];
        // let pCost =
        //   (itemPrice.pricePerUnit +
        //     (itemPrice.printCommission / 100) * itemPrice.pricePerUnit) *
        //   selectedSqft *
        //   quant;
        let pCost =
          (itemPrice.pricePerUnit +
            (itemPrice.printCommission / 100) * itemPrice.pricePerUnit) *
          selectedSqft;

        let gstPercentage = item[0].PrintGST / 100;
        this.orderPrice.printerCost = Math.round(
          itemPrice.pricePerUnit * selectedSqft +
            itemPrice.pricePerUnit * selectedSqft * gstPercentage
        );
        let pGST = pCost * gstPercentage;
        let totalPrintCost = pCost + pGST;
        this.orderPrice.printGST = Math.round(pGST);
        this.orderPrice.printCost = Math.round(pCost);
        this.orderPrice.totalPrintCost = Math.round(totalPrintCost);
        this.orderPrice.deliveryDays = itemPrice.deliveryDays;
        this.orderPrice.printGSTPct = gstPercentage;
      }
    } else {
      this.orderPrice.printGST = 0;
      this.orderPrice.printCost = 0;
      this.orderPrice.totalPrintCost = 0;
    }
  }
}
