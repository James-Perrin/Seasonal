import { Component, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from "highcharts/highmaps";
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Seasonal';
  Highcharts: any;
  chartConstructor = "mapChart";
  chartOptions: any;
  drilldown: any;
  properties: any;
  value: any;
  location: string = "Clear me";

  constructor() {}

  ngOnInit() {
    this.Highcharts = Highcharts;
    const caMapData = require("@highcharts/map-collection/countries/ca/ca-all.geo.json");
    const caMap = Highcharts.geojson(caMapData);

    caMap.forEach((el: any, i) => {
      el.drilldown = el.properties["hc-key"];
    });
    
    this.chartOptions = {
      chart: {
        height: (8 / 16) * 100 + "%",
        events: {
          drilldown(e : any) {
            console.log(e)
            const chart = this as any;
            const mapData = can_data.filter(a => a.province == e.point.name)[0].mapData;
            const provinceData = Highcharts.geojson(mapData);
            chart.addSeriesAsDrilldown(e.point, {
              name: e.point.name,
              data: provinceData,
            });
            chart.setTitle(null, { text: e.point.name });
          },
          drillup() {
            const chart = this as any;
          },
        }
      },
      title: {
        text: ""
      },
      colorAxis: {
        min: 0,
        minColor: "#E6E7E8",
        maxColor: "#417BCC"
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#F8BA03"
            }
          }
        }
      },
      series: [
        {
          name: "Canada",
          data: caMap
        }
      ],
      drilldown: {
        click: () => {
          console.log("TEMp");
        }
      }
    };
  }
}



const can_data = [
  {
    province: "Newfoundland and Labrador",
    short: "nl",
    mapData: require(`@highcharts/map-collection/countries/ca/ca-ab-all.geo.json`)
  },
  {
    province: "Prince Edward Island", 
    short: "pe",    mapData: require(`@highcharts/map-collection/countries/ca/ca-pe-all.geo.json`)
},
  {
    province: "Nova Scotia", 
    short: "ns",    mapData: require(`@highcharts/map-collection/countries/ca/ca-ns-all.geo.json`)
},
  {
    province: "New Brunswick", 
    short: "nb",    mapData: require(`@highcharts/map-collection/countries/ca/ca-nb-all.geo.json`)
},
  {
    province: "Québec",	
    short: "qc",    mapData: require(`@highcharts/map-collection/countries/ca/ca-qc-all.geo.json`)
},
  {
    province: "Ontario",	
    short: "on",    mapData: require(`@highcharts/map-collection/countries/ca/ca-on-all.geo.json`)
},
  {
    province: "Manitoba", 
    short: "mb",    mapData: require(`@highcharts/map-collection/countries/ca/ca-mb-all.geo.json`)
},
  {
    province: "Saskatchewan", 
    short: "sk",    mapData: require(`@highcharts/map-collection/countries/ca/ca-sk-all.geo.json`)
},
  {
    province: "Alberta",	
    short: "ab",    mapData: require(`@highcharts/map-collection/countries/ca/ca-ab-all.geo.json`)
},
  {
    province: "British Columbia", 
    short: "bc",    mapData: require(`@highcharts/map-collection/countries/ca/ca-bc-all.geo.json`)
},
  {
    province: "Yukon", 
    short: "yt",    mapData: require(`@highcharts/map-collection/countries/ca/ca-yt-all.geo.json`)
},
  {
    province: "Northwest Territories", 
    short: "nt",    mapData: require(`@highcharts/map-collection/countries/ca/ca-nt-all.geo.json`)
},
  {
    province: "Nunavut", 
    short: "nu",
    mapData: require(`@highcharts/map-collection/countries/ca/ca-nu-all.geo.json`)
  }
];
