import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { AdminService } from "../../services/admin.service";
import { ProductsFormsComponent } from "../products-forms/products-forms.component";
import { ProductListsComponent } from "../product-lists/product-lists.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  frameworkComponents: any;
  productLists: any;
  columnDefs = [
    {
      headerName: "Id",
      field: "poductDetailsId",
      sortable: true,
      filter: true
    },
    { headerName: "Name", field: "productName", sortable: true, filter: true },
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
    { headerName: "Size", field: "productSize", sortable: true, filter: true },
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
      headerName: "Edit Product",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editProduct.bind(this),
        label: "Edit"
      }
    }
  ];
  colDefProdList = [
    { headerName: "Product Id", field: "key", sortable: true, filter: true },
    { headerName: "Name", field: "value", sortable: true, filter: true },
    {
      headerName: "Preference",
      field: "producPreference",
      sortable: true,
      filter: true
    },
    {
      headerName: "Edit Product",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editprodList.bind(this),
        label: "Edit"
      }
    }
  ];

  rowData: any;
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
    debugger;
    this.fetchProductsData();
  }
  fetchProductsData() {
    this.spinner.show();
    this.rowData = this.admin.getProducts();
    this.admin.getProducts().subscribe(
      data => {
        debugger;
        this.spinner.hide();
        this.rowData = data["productList"];
        this.productLists = data["products"];
        this.printPrice = data["printPrice"];
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
    debugger;
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
  editProduct(e) {
    console.log(e.rowData);
    const modelRef = this.modalService.open(ProductsFormsComponent, {
      size: "lg",
      backdrop: "static"
    });
    modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.editForm = true;
    modelRef.componentInstance.selectedProduct = e.rowData;
    modelRef.componentInstance.printPriceList=this.printPrice;
    modelRef.result.then(data => {
      this.fetchProductsData();
    });

    //this.modalService.editForm
    //alert()
  }
  editprintPrice(e) {}
}
