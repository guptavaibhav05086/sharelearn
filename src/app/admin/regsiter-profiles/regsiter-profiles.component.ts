import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-regsiter-profiles",
  templateUrl: "./regsiter-profiles.component.html",
  styleUrls: ["./regsiter-profiles.component.css"]
})
export class RegsiterProfilesComponent implements OnInit {
  constructor(private admin: AdminService) {}
  rowDataprinter;
  rowDatadesigner;
  gridApi;
  gridApiprinter;
  ngOnInit(): void {
    this.admin.getProflies().subscribe(
      data => {
        this.rowDatadesigner = data["dprofile"];
        this.rowDataprinter = data["pprofile"];
        console.log(data);
      },
      err => {
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
  onBtnExportDataAsCsv() {
    this.gridApi.exportDataAsCsv();
  }
  onBtnExportDataAsCsvPrinter() {
    this.gridApiprinter.exportDataAsCsv();
  }
  columnDefs = [
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
    }
  ];
  columnDefPrinter = [
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
    }
  ];
}
