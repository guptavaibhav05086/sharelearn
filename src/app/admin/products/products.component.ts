import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { AdminService } from "../../services/admin.service";
import { ProductsFormsComponent } from "../products-forms/products-forms.component";
import { ProductListsComponent } from "../product-lists/product-lists.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { Discounts } from "src/app/Models/discounts";
import { DiscountFormComponent } from "../discount-form/discount-form.component";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  private gridApi;
  frameworkComponents: any;
  productLists: any;
  discountLists: Discounts;
  columnDefs: any;
  colDefProdList: any;
  colDefDisList: any;
  rowData: any;
  defineColDefs() {
    this.columnDefs = [
      {
        headerName: "Id",
        field: "poductDetailsId",
        sortable: true,
        filter: true
      },
      {
        headerName: "Name",
        field: "productName",
        sortable: true,
        filter: true
      },
      {
        headerName: "Subcategory",
        field: "productSubcategory",
        sortable: true,
        filter: true
      },
      {
        headerName: "Classification",
        field: "productCategory",
        sortable: true,
        filter: true
      },
      {
        headerName: "Price",
        field: "productPrice",
        sortable: true,
        filter: true
      },
      {
        headerName: "Size",
        field: "productSize",
        sortable: true,
        filter: true
      },
      {
        headerName: "Orientation",
        field: "orientation",
        sortable: true,
        filter: true
      },
      { headerName: "GSM", field: "paperGSM", sortable: true, filter: true },
      {
        headerName: "Quantities",
        field: "quantities",
        sortable: true,
        filter: true
      },
      {
        headerName: "Preference",
        field: "producPreference",
        sortable: true,
        filter: true
      },
      {
        headerName: "ProductCode",
        field: "productCode",
        sortable: true,
        filter: true
      },
      {
        headerName: "DesignPrice",
        field: "DesignPrice",
        sortable: true,
        filter: true
      },
      {
        headerName: "DesignGST",
        field: "DesignGST",
        sortable: true,
        filter: true
      },
      {
        headerName: "DesignCommision",
        field: "DesignCommision",
        sortable: true,
        filter: true
      },
      {
        headerName: "PrintPrice",
        field: "PrintPrice",
        sortable: true,
        filter: true
      },
      {
        headerName: "PrintGST",
        field: "PrintGST",
        sortable: true,
        filter: true
      },
      {
        headerName: "PrintCommision",
        field: "PrintCommision",
        sortable: true,
        filter: true
      },
      {
        headerName: "Delivery Fees",
        field: "deliveryFees",
        sortable: true,
        filter: true
      },
      {
        headerName: "DeliveryTime",
        field: "deliveryTime",
        sortable: true,
        filter: true
      },
      {
        headerName: "SlotTimeGap",
        field: "SlotTimeGap",
        sortable: true,
        filter: true
      },
      {
        headerName: "IsPriceInSqFt",
        field: "IsPriceInSqFt",
        sortable: true,
        filter: true
      },
      {
        headerName: "IsDisabled",
        field: "IsDisabled",
        sortable: true,
        filter: true
      },
      {
        headerName: "Edit Product",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.editProduct.bind(this),
          label: "Edit"
        }
      },
      {
        headerName: "Disable",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.deleteProductDetails.bind(this),
          label: "ProdDelete"
        }
      }
    ];
    this.colDefProdList = [
      { headerName: "Product Id", field: "key", sortable: true, filter: true },
      { headerName: "Name", field: "value", sortable: true, filter: true },
      {
        headerName: "Preference",
        field: "producPreference",
        sortable: true,
        filter: true
      },
      {
        headerName: "Icon",
        field: "productIcon",
        sortable: true,
        filter: true
      },
      {
        headerName: "Image",
        field: "productImage",
        sortable: true,
        filter: true
      },
      {
        headerName: "Category",
        field: "category",
        sortable: true,
        filter: true
      },
      {
        headerName: "IsDisabled",
        field: "IsDisabled",
        sortable: true,
        filter: true
      },
      {
        headerName: "Edit",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.editprodList.bind(this),
          label: "Edit"
        }
      },
      {
        headerName: "Disable",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.deleteprodList.bind(this),
          label: "ProdDelete"
        }
      }
    ];
    this.colDefDisList = [
      {
        headerName: "Discount Id",
        field: "DiscountId",
        sortable: true,
        filter: true
      },
      {
        headerName: "CartAmount",
        field: "CartAmount",
        sortable: true,
        filter: true
      },
      {
        headerName: "DiscountPercentage",
        field: "DiscountPercentage",
        sortable: true,
        filter: true
      },
      {
        headerName: "Edit",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.editdiscountPrice.bind(this),
          label: "Edit"
        }
      },
      {
        headerName: "Delete",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.deleteDiscout.bind(this),
          label: "Delete"
        }
      }
    ];
  }

  printPrice: any;
  constructor(
    private admin: AdminService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }
  ngOnInit(): void {
    ////debugger;
    this.fetchProductsData();
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onBtnExportDataAsCsv() {
    this.gridApi.exportDataAsCsv();
  }
  fetchProductsData() {
    this.spinner.show();
    this.rowData = this.admin.getProducts();
    this.admin.getProducts().subscribe(
      data => {
        ////debugger;
        this.spinner.hide();
        this.rowData = data["productList"];
        this.productLists = data["products"];
        this.printPrice = data["printPrice"];
        this.discountLists = data["discountList"];
        this.defineColDefs();
      },
      err => {
        this.spinner.hide();
      }
    );
  }
  createProduct() {
    const modelRef = this.modalService.open(ProductsFormsComponent, {
      size: "lg",
      backdrop: "static"
    });
    modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.editForm = false;
  }
  createProductList() {
    const modelRef = this.modalService.open(ProductListsComponent, {
      backdrop: "static"
    });
    //modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.isEdit = false;
    modelRef.result.then(data => {
      this.fetchProductsData();
    });
  }
  editprodList(e) {
    ////debugger;
    const modelRef = this.modalService.open(ProductListsComponent, {
      backdrop: "static"
    });
    //modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.isEdit = true;
    modelRef.componentInstance.selProduct = e.rowData;
    modelRef.result.then(data => {
      this.fetchProductsData();
    });
  }
  deleteprodList(e) {
    ////debugger;
    let result = confirm("Do you want to delete the product");
    if (result) {
      this.admin.deleteProduct(e.rowData.key).subscribe(
        data => {
          this.fetchProductsData();
        },
        err => {
          alert("Error in deleting the item");
        }
      );
    }
  }
  deleteProductDetails(e) {
    let result = confirm("Do you want to delete the product");
    if (result) {
      this.admin.deleteProductList(e.rowData.poductDetailsId).subscribe(
        data => {
          this.fetchProductsData();
        },
        err => {
          alert("Error in deleting the item");
        }
      );
    }
  }
  editProduct(e) {
    console.log(e.rowData);
    const modelRef = this.modalService.open(ProductsFormsComponent, {
      size: "lg",
      backdrop: "static"
    });
    modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.editForm = true;
    modelRef.componentInstance.selectedProduct = e.rowData;
    modelRef.componentInstance.printPriceList = this.printPrice;
    modelRef.result.then(data => {
      this.fetchProductsData();
    });

    //this.modalService.editForm
    //alert()
  }
  deleteDiscout(e) {
    let result = confirm("Do you want to delete the product");
    if (result) {
      this.admin.deleteDiscounts(e.rowData.DiscountId).subscribe(item => {
        console.log(item);
        this.fetchProductsData();
      });
    }
    //DiscountId
  }
  creatediscountPrice() {
    const modelRef = this.modalService.open(DiscountFormComponent, {
      backdrop: "static"
    });

    modelRef.componentInstance.editForm = false;
    modelRef.componentInstance.item = null;

    modelRef.result.then(data => {
      this.fetchProductsData();
    });
  }
  editdiscountPrice(e) {
    const modelRef = this.modalService.open(DiscountFormComponent, {
      backdrop: "static"
    });

    modelRef.componentInstance.editForm = true;
    modelRef.componentInstance.item = e.rowData;

    modelRef.result.then(data => {
      this.fetchProductsData();
    });
  }
}
