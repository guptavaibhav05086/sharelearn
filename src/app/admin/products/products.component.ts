import { Component, OnInit } from "@angular/core";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { AdminService } from "../../services/admin.service";
import { ProductsFormsComponent } from "../products-forms/products-forms.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  frameworkComponents: any;
  productLists:any;
  columnDefs = [
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
      headerName: "Edit Product",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editProduct.bind(this),
        label: "Edit"
      }
    }
  ];

  rowData: any;
  constructor(private admin: AdminService, private modalService: NgbModal) {
    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }
  ngOnInit(): void {
    debugger;
    this.rowData = this.admin.getProducts();
    this.admin.getProducts().subscribe(
      data => {
        debugger;
        this.rowData = data["productList"];
        this.productLists=data['products']
      },
      err => {}
    );
  }
  createProduct(){
    const modelRef=this.modalService.open(ProductsFormsComponent, {
      size: "lg",
      backdrop: "static"
    });
    modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.editForm=false;
  }
  editProduct(e) {
    console.log(e.rowData);
    const modelRef=this.modalService.open(ProductsFormsComponent, {
      size: "lg",
      backdrop: "static"
    });
    modelRef.componentInstance.productList = this.productLists;
    modelRef.componentInstance.editForm=true;
    modelRef.componentInstance.selectedProduct=e.rowData;

    //this.modalService.editForm
    //alert()
  }
}
