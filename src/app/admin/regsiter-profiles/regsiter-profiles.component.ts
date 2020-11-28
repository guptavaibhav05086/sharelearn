import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ViewDesignerProfileComponent } from "../view-designer-profile/view-designer-profile.component";
import { ViewPrinterProfileComponent } from "../view-printer-profile/view-printer-profile.component";
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-regsiter-profiles",
  templateUrl: "./regsiter-profiles.component.html",
  styleUrls: ["./regsiter-profiles.component.css"]
})
export class RegsiterProfilesComponent implements OnInit {
  constructor(
    private admin: AdminService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonrendererComponent
    };
  }
  rowDataprinter;
  rowDatadesigner;
  rowDataCustomer;
  gridApi;
  gridApiprinter;
  gripApiCustomer;
  frameworkComponents: any;
  ngOnInit(): void {
    this.getAdminProfile();
  }

  getAdminProfile() {
    this.spinner.show();
    this.admin.getProflies().subscribe(
      data => {
        this.rowDatadesigner = data["dprofile"];
        this.rowDataprinter = data["pprofile"];
        this.rowDataCustomer = data["customerProfile"];
        console.log(data);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onGridReadyPrinter(params) {
    this.gridApiprinter = params.api;
  }
  onGridReadyCustomer(params) {
    this.gripApiCustomer = params.api;
  }
  onBtnExportDataAsCsv() {
    this.gridApi.exportDataAsCsv();
  }
  onBtnExportDataAsCsvPrinter() {
    this.gridApiprinter.exportDataAsCsv();
  }
  onBtnExportDataAsCsvCustomer() {
    this.gripApiCustomer.exportDataAsCsv();
  }
  columnDefs = [
    //Registrationnumber
    {
      headerName: "Registration Id",
      field: "Registrationnumber",
      sortable: true,
      filter: true,
      pinned: "left"
    },
    {
      headerName: "FirstName",
      field: "firstName",
      sortable: true,
      filter: true
    },
    {
      headerName: "lastName",
      field: "lastName",
      sortable: true,
      filter: true
    },
    { headerName: "EmailId", field: "emailId", sortable: true, filter: true },
    {
      headerName: "Gender",
      field: "gender",
      sortable: true,
      filter: true
    },
    {
      headerName: "MobileNumber",
      field: "mobileNumber",
      sortable: true,
      filter: true
    },
    { headerName: "Pan", field: "pan", sortable: true, filter: true },
    {
      headerName: "Aadhar",
      field: "qualification",
      sortable: true,
      filter: true
    },
    { headerName: "City", field: "city", sortable: true, filter: true },
    {
      headerName: "DOB",
      field: "dob",
      sortable: true,
      filter: true
    },
    {
      headerName: "isMobileVerified",
      field: "isMobileVerified",
      sortable: true,
      filter: true
    },
    {
      headerName: "isRegistrationFeesPaid",
      field: "isPaymentDone",
      sortable: true,
      filter: true
    },
    {
      headerName: "PostalCode",
      field: "postalCode",
      sortable: true,
      filter: true
    },
    {
      headerName: "Softwares",
      field: "softwares",
      sortable: true,
      filter: true
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true
    },
    {
      headerName: "State",
      field: "state",
      sortable: true,
      filter: true
    },
    {
      headerName: "ProfileUrl",
      field: "profileUrl",
      sortable: true,
      filter: true
    },
    {
      headerName: "Exp",
      field: "exp",
      sortable: true,
      filter: true
    },
    {
      headerName: "Verify",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.VerifyDesigner.bind(this),
        label: "Verify"
      }
    }
  ];
  columnDefPrinter = [
    {
      headerName: "Registration Id",
      field: "Registrationnumber",
      sortable: true,
      filter: true
    },
    {
      headerName: "FirstName",
      field: "firstName",
      sortable: true,
      filter: true
    },
    {
      headerName: "lastName",
      field: "lastName",
      sortable: true,
      filter: true
    },
    { headerName: "EmailId", field: "email", sortable: true, filter: true },
    {
      headerName: "Gender",
      field: "gender",
      sortable: true,
      filter: true
    },
    {
      headerName: "MobileNumber",
      field: "mobileNumber",
      sortable: true,
      filter: true
    },
    { headerName: "Pan", field: "pan", sortable: true, filter: true },
    {
      headerName: "Aadhar",
      field: "aadhar",
      sortable: true,
      filter: true
    },
    {
      headerName: "DOB",
      field: "dob",
      sortable: true,
      filter: true
    },
    {
      headerName: "isMobileVerified",
      field: "isMobileVerified",
      sortable: true,
      filter: true
    },
    {
      headerName: "isRegistrationFeesPaid",
      field: "isPaymentDone",
      sortable: true,
      filter: true
    },
    {
      headerName: "Address",
      field: "address",
      sortable: true,
      filter: true
    },
    {
      headerName: "ProfileUrl",
      field: "profileUrl",
      sortable: true,
      filter: true
    },
    {
      headerName: "GST",
      field: "gst",
      sortable: true,
      filter: true
    },
    {
      headerName: "Verify",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.VerifyPrinter.bind(this),
        label: "Verify"
      }
    }
  ];
  columnDefCustomer = [
    {
      headerName: "FirstName",
      field: "firstName",
      sortable: true,
      filter: true
    },
    { headerName: "EmailId", field: "emailId", sortable: true, filter: true },

    {
      headerName: "MobileNumber",
      field: "mobileNumber",
      sortable: true,
      filter: true
    },
    {
      headerName: "RegisteredDate",
      field: "cretaedDate",
      sortable: true,
      filter: true
    },
    {
      headerName: "isMobileVerified",
      field: "isMobileVerified",
      sortable: true,
      filter: true
    },
    {
      headerName: "isEmailVerified",
      field: "isEmailVerified",
      sortable: true,
      filter: true
    }
  ];
  VerifyDesigner(e) {
    ////debugger;
    let modelRef = this.modalService.open(ViewDesignerProfileComponent, {
      size: "lg"
    });
    modelRef.componentInstance.profile = e.rowData;

    console.log(e.rowData);
    modelRef.result.then(data => {
      //this.getAdminProfile();
    });
  }
  VerifyPrinter(e) {
    ////debugger;
    let modelRef = this.modalService.open(ViewPrinterProfileComponent, {
      size: "lg"
    });
    modelRef.componentInstance.profile = e.rowData;
    console.log(e.rowData);
    modelRef.result.then(data => {
      //this.getAdminProfile();
    });
  }
}
