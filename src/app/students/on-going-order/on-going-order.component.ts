import { Component, OnInit } from '@angular/core';
import { ButtonrendererComponent } from "../buttonrenderer/buttonrenderer.component";
import { GridOptions } from 'ag-grid-community';


@Component({
  selector: 'app-on-going-order',
  templateUrl: './on-going-order.component.html',
  styleUrls: ['./on-going-order.component.css']
})
export class OnGoingOrderComponent  {

  gridApi:any;
  columnApi:any;
  gridOptions:any;
  columnDefs = [
    {"headerName": 'Order Id', "field": 'orderid' },
    {"headerName": 'Sub-Category', "field": 'subcategory' },
    {"headerName": 'Meeting Slot', "field": 'meetingslot' , sortable: true},
    { "headerName": 'Actions', 
      "field": 'actions' ,
      "cellRendererFramework": ButtonrendererComponent }
  ]
  rowData = [
    { orderid: 100, subcategory: 'A', meetingslot: new Date("September 10,2020"),actions: 'Check Details' },
    { orderid: 101, subcategory: 'B', meetingslot: new Date("August 11,2020") ,actions: 'Check Details'},
    { orderid: 102, subcategory: 'C', meetingslot: new Date("September 12,2020"),actions: 'Check Details' }
  ]

  constructor(){
    this.gridOptions= <GridOptions>{
      getRowStyle: this.checkRow.bind(this),
    }
  }

  OngridReady(params){
    this.gridApi=params.api;
    this.columnApi=params.columnApi;
  }
 
  checkRow(params){
    if(params.data.meetingslot< new Date()){
      return {
        'background-color': '#455A64',
            'color': '#FFFFFF'
      }
    }
  }

}