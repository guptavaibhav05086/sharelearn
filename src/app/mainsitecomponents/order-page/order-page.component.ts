import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";
import { HelperService } from "src/app/services/helper.service";
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from 'rxjs/internal/operators/delay';
@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.css"]
})
export class OrderPageComponent implements OnInit {
  minDate: NgbDateStruct;
  model: NgbDateStruct;
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
  displaysummary = false;
  displaycartMessage = false;
  displayLenghtWidth=false;
  Servicable = false;
  isEditOrder=false;
  cartItemId=0;
  fileError=false;
  isPhotoUrlValid: boolean;
  
  uploadedFileNames={
    product:"Sample of Product you like",
    image1:"Logo/Image 1",
    image2:"Logo/Image 2",
    content:"Content File in .doc,docx,.pdf format"
  }
  orderPrice = {
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
    deliveryDays: 0
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
      if (!file.type.match("image.*")) {
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
    debugger;
    var result = "";
    var file;
    const formData = new FormData();
    var userImage = images.item(0);
    debugger;
    for (var i = 0; (file = images[i]); i++) {
      //if the file is not an image, continue
      if (!this.validateFiles(name, file)) {
        alert('Not a Valid Image File');
        return;
      }
      let reader = new FileReader();

      reader.readAsDataURL(file);
      
    }
    formData.append(name, userImage, userImage.name);
    
    //this.selectedFileName=userImage.name;
    this.spinner.show();

    this.custService.uploadUserImage(formData).subscribe(
      data => {
        this.spinner.hide();
        debugger;
        console.log(data);
        alert("File Uploaded Successfully");
        this.uploadedFileNames[name]=data;
        this.fileError = false;
        //this.selectedFileName = userImage.name;
      },
      err => {
        this.spinner.hide();
        debugger;
        this.fileError = true;
        alert("Issue in file upload please contact admin");
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
    meetingDate: new FormControl({}),
    meetingSlot: new FormControl(""),
    professionDesigner: new FormControl(false),
    sourceFile: new FormControl(false),
    sourceFileSpecs: new FormControl(false),
    pinCode: new FormControl("", [Validators.required]),
    GSTNumber: new FormControl(""),
    BillingName: new FormControl(""),
    purpose:new FormControl("")
  });
  addToCart() {
    debugger;
    if (
      this.checkCartValidation(this.orderForm.controls["type"].value) == false
    ) {
      return;
    }
    let id = 1;
    if (
      this.custService.getLocalStorageCart() != null &&
      this.custService.getLocalStorageCart().length > 0
    ) {
      let cartLastItems = this.custService.getLocalStorageCart()[
        this.custService.getLocalStorageCart().length - 1
      ];
      id = cartLastItems.id + 1;
    }
    if(this.isEditOrder){
      this.custService.deletItemFromCart(this.cartItemId);
      id=this.cartItemId;
    }
    let cartItem = {
      id: id,
      type: this.orderForm.controls["type"].value,
      GSTNumber: this.orderForm.controls["GSTNumber"].value,
      BillingName: this.orderForm.controls["BillingName"].value,
      uploadedimages:this.uploadedFileNames,
      category: [
        {
          name: this.orderForm.controls["category"].value,
          specs: {
            subCategory: this.orderForm.controls["subCategory"].value,
            orientation: this.orderForm.controls["orientation"].value,
            size: this.orderForm.controls["size"].value,
            paperGSM: this.orderForm.controls["GSM"].value,
            quantity: this.orderForm.controls["quantities"].value,
            pinCode:this.orderForm.controls["pinCode"].value
          },
          meetingDetails: {
            day: this.orderForm.controls["meetingDate"].value,
            slot: this.orderForm.controls["meetingSlot"].value
          },
          price: {
            price: this.orderPrice.price,
            deliveryFee: this.orderPrice.deliveryFee,
            GST: this.orderPrice.GST,
            Total: this.orderPrice.Total
          },
          professionalDesigner: this.orderForm.controls["professionDesigner"]
            .value,
          sourceFile: this.orderForm.controls["sourceFile"].value,
          purpose:this.orderForm.controls["purpose"].value
        }
      ]
    };
    this.custService.addItemUserOrdersList(cartItem);
    this.displaycartMessage = true;
  }
  scrollToElement($element): void {
    console.log($element);
   
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  proSpec = {
    orientation: [],
    size: [],
    gsm: [],
    quantities: [],
    subcat: [],
    displayQuant: []
  };
  constructor(
    private admin: AdminService,
    private custService: CustomerService,
    private _helper: HelperService,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService
  ) {}

  proceedOrder($element:any) {
    this.displayMeetings = false;
    this.displaysummary = true;
    // if (this.orderForm.controls["type"].value == "Print Only") {
    //   this.displayMeetings = false;
    //   this.displaysummary = true;
    // } else {
    //   this.displayMeetings = true;
    // }
    debugger;
    this.calculatePrice(
      this.orderForm.controls["type"].value,
      this.orderForm.controls["subCategory"].value,
      this.orderForm.controls["orientation"].value,
      this.orderForm.controls["size"].value
    );
    console.log(this.orderPrice);
    this.scrollToElement($element);
    //TODO Calculate Price method
  }
  dateSet() {
    if (
      this.orderForm.controls["meetingDate"].value != "" &&
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
    this._helper.navigateToPath("/selectAddress");
  }
  resetControls() {
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
      sourceFile: false
    });
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
      deliveryDays: 0
    };
    this.displaySpecs = false;
    this.displayMeetings = false;
    this.displaysummary = false;
  }
  checkCartValidation(category) {
    debugger;
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
        debugger;
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
  showCategory(category) {
    if(!this.isEditOrder){
      if (this.checkCartValidation(category) == false) {
        return;
      }
    }
    
    debugger;
    this.resetControls();
    this.selectedCategory = this.products.filter(
      item => item.category == category || item.category == "Design And Print"
    );
    if (category == "Design And Print" || category == "Print Only") {
      this.displayprinter = true;
      this.displayDesigner = false;
      this.Servicable = false;
      if (category == "Design And Print") {
        this.displayDesigner = true;
      }
      this.orderForm.patchValue({
        pinCode: ""
      });
    } else {
      this.displayprinter = false;
      this.displayDesigner = true;
      this.orderForm.patchValue({
        pinCode: "0"
      });
      this.Servicable = true;
    }
    this.displayCategory = true;
    this.orderForm.patchValue({
      type: category
    });
    console.log(this.selectedCategory);
    // this.selectedCategory.sort((a, b) => a.value.localeCompare(b.value));
  }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        debugger;
        console.log(params); // { order: "popular" }
        //this.cartItemId = params.itemId;
        if(params.itemId !=undefined){
          this.cartItemId = params.itemId;
          this.isEditOrder=true;
        }
        else{
          this.isEditOrder=false;
        }
        
        
       // popular
      }
    );
    this.spinner.show();
    this.admin.getProducts().subscribe(
      data => {
        this.productList = data["productList"];
        this.products = data["products"];
        this.printPrice = data["printPrice"];
        console.log(data);
        debugger;
        if(this.isEditOrder){
          this.openEditForm(this.cartItemId);
          this.spinner.hide();
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
    this.orderForm.patchValue({
      meetingDate: initialDate
    });
  }

  openEditForm(id){
    
    let cart = this.custService.getLocalStorageCart();
    let editItem = cart.filter(item=> item.id == id);
    if(editItem !=null){

      
      this.showCategory(editItem[0].type);
      this.selectedProduct(editItem[0].category[0].name,null);
      let e ={
        target:{
          value: editItem[0].category[0].specs.size
        }
      }
      this.selectedSize(e);
      this.orderForm.patchValue({
        type:editItem[0].type,
        category:editItem[0].category[0].name,
        professionDesigner:editItem[0].category[0].professionalDesigner,
        sourceFile:editItem[0].category[0].sourceFile,
        GSTNumber: editItem[0].GSTNumber,
        BillingName: editItem[0].BillingName,
        subCategory: editItem[0].category[0].specs.subCategory ,
        orientation: editItem[0].category[0].specs.orientation,
        size: editItem[0].category[0].specs.size,
        GSM: editItem[0].category[0].specs.paperGSM,
        quantities:editItem[0].category[0].specs.quantity,
        pinCode:editItem[0].category[0].specs.pinCode
        
      });
      this.Servicable=true;
    }
    

  }
  selectedProduct(value,$element) {
    //debugger;
    this.checkedProduct = this.productList.filter(
      item => item.productName == value
    );

    this.resetControls();

    this.displaySpecs = true;
    if(this.checkedProduct.IsPriceInSqFt =="Yes"){
      this.displayLenghtWidth = true;
    }
    else{
      this.displayLenghtWidth = false;
    }
    this.proSpec.subcat = [];
    this.proSpec.size = [];
    this.proSpec.orientation = [];
    this.proSpec.quantities = [];
    this.proSpec.gsm = [];
    this.description = "";
    this.displaycartMessage = false;
    this.checkedProduct.forEach((element, index) => {
      if (element.productDescription != null) {
        this.description = element.productDescription;
      }

      this.proSpec.subcat.push(element.productSubcategory);
      this.proSpec.size.push(element.productSize);
      this.proSpec.orientation.push(element.orientation);
      this.proSpec.quantities.push({
        size: element.productSize,
        qunat: element.quantities
      });
      this.proSpec.gsm.push(element.paperGSM);
    });

    this.proSpec.gsm = [...new Set(this.proSpec.gsm)];
    this.proSpec.orientation = [...new Set(this.proSpec.orientation)];
    this.proSpec.quantities = [...new Set(this.proSpec.quantities)];
    this.proSpec.size = [...new Set(this.proSpec.size)];
    
    this.orderForm.patchValue({
      category: value
    });
    console.log(this.proSpec);
     //delay(5000);
    //this.proSpec.displayQuant=this.proSpec.quantities.sp
    this.scrollToElement($element);
  }
  selectedSize(e) {
    debugger;
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
    debugger;
    let prod = this.productList.filter(
      item =>
        (item.productCategory == pCat ||
          item.productCategory == "Design And Print") &&
        item.productSubcategory == pSubcat &&
        item.orientation == orien &&
        item.productSize == size
    );
    if (prod != null && prod.length > 0) {
      let item = prod[0];
      if (pCat == "Design And Print") {
        this.calculatepriceDesign(item);
        this.calculatepriceprint(prod);
        this.orderPrice.deliveryFee = item.deliveryFees;
      } else if (pCat == "Print Only") {
        this.calculatepriceprint(prod);
        this.orderPrice.deliveryFee = item.deliveryFees;
      } else if (pCat == "Design Only") {
        this.calculatepriceDesign(item);
      }
     
    }
    this.orderPrice.Total = Math.round(
      this.orderPrice.totalDesignCost +
        this.orderPrice.totalPrintCost +
        this.orderPrice.deliveryFee
    );
    this.orderPrice.GST = Math.round(
      this.orderPrice.printGST + this.orderPrice.designGST
    );
    this.orderPrice.price = Math.round(
      this.orderPrice.designCost + this.orderPrice.printCost
    );
  }

  calculatepriceDesign(item) {
    let designCost =
      item.DesignPrice + (item.DesignCommision / 100) * item.DesignPrice;
    let designGST = designCost * (item.DesignGST / 100);
    let totalDesignCost = designCost + designGST;
    this.orderPrice.designCost = designCost;
    this.orderPrice.designGST = designGST;
    this.orderPrice.totalDesignCost = totalDesignCost;
  }
  calculatepriceprint(item) {
    debugger;
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
        this.orderPrice.printGST = pGST;
        this.orderPrice.printCost = pCost;
        this.orderPrice.totalPrintCost = totalPrintCost;
        this.orderPrice.deliveryDays = itemPrice.deliveryDays;
      }
    }
  }
}
