import { Component, OnInit } from "@angular/core";
import { SliderData } from "src/app/Models/slider-data";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  slidesStore: Array<SliderData> = [
    {
      id: 1,
      src: "../../../assets/img/Recuriters/clinilead.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 2,
      src: "../../../assets/img/Recuriters/drauplogo.PNG",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 3,
      src: "../../../assets/img/Recuriters/phygitalInsights.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 4,
      src: "../../../assets/img/Recuriters/logo.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 5,
      src: "../../../assets/img/Recuriters/imPac.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 6,
      src: "../../../assets/img/Recuriters/experts.gif",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 7,
      src: "../../../assets/img/Recuriters/ESoftSys.jpg",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 8,
      src: "../../../assets/img/Recuriters/DuestcheBank.png",
      title: "Infosys",
      alt: "Infosys"
    },

    {
      id: 9,
      src: "../../../assets/img/Recuriters/qDrift.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 10,
      src: "../../../assets/img/Recuriters/relevance.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 11,
      src: "../../../assets/img/Recuriters/sprinklebytes.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 12,
      src: "../../../assets/img/Recuriters/standardCharted.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 13,
      src: "../../../assets/img/Recuriters/tavant.png",
      title: "Infosys",
      alt: "Infosys"
    },
    {
      id: 14,
      src: "../../../assets/img/Recuriters/UST.png",
      title: "Infosys",
      alt: "Infosys"
    }
  ];
  constructor() {}

  ngOnInit() {}
}
