import { Component, OnInit ,TemplateRef, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartOptions } from 'highcharts';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { MouseEvent } from '@agm/core';

export interface PeriodicElement {
  name: string;
  position: number;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', },
  {position: 2, name: 'Helium', },
  {position: 3, name: 'Lithium', },
  {position: 4, name: 'Beryllium', },
  {position: 5, name: 'Boron', },
 
];

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface Food {
  value: string;
  viewValue: string;
}

interface City {
  value: string;
  viewValue: string;
}

interface Region {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  
  
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
   chart:any;
   barchart : any;

  selectedValue!: "string";
  lat = 21.3069; 

  lng = -157.8583; 

 mapType = 'hybrid';
 icon=''

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'APEC'},
    {value: 'pizza-1', viewValue: 'Central America'},
    {value: 'tacos-2', viewValue: 'USA'},
  ];
  cites: City[] = [
    {value: 'steak-0', viewValue: 'option 1'},
    {value: 'pizza-1', viewValue: 'option 2'},
    {value: 'tacos-2', viewValue: 'option 3'},
  ];

  regions: Region[] = [
    {value: 'steak-0', viewValue: 'option 1'},
    {value: 'pizza-1', viewValue: 'option 2'},
    {value: 'tacos-2', viewValue: 'option 3'},
  ];


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  
  cards = [
    { title: 'Card 1', content: 'Content of Card 1' },
    { title: 'Card 2', content: 'Content of Card 2' },
    { title: 'Card 3', content: 'Content of Card 3' },
    { title: 'Card 4', content: 'Content of Card 4' },
    // Add more cards as needed
  ];


  displayedColumns: string[] = ['position', 'name', ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
 
  constructor(public dialog: MatDialog) {
    this.dialogTemplate = {} as TemplateRef<any>
   }

  
  
  openDialog(): void {
    this.dialog.open(this.dialogTemplate, {
      width: '400px', // Adjust width as needed
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
  
  ngOnInit() {
    this.chart = new Highcharts.Chart({
      chart: {
         renderTo: 'container',
          type: 'pie'
      },
      title: {
          text: 'Risk Index',
          align:'left',
         
      },
      subtitle:{
        text :'Total as on March 06,2024',
        align : 'left'
      },
      
      yAxis: {
          title: {
              text: 'Total percent market share'
          }
      },
     
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '{point.y}%',
                  distance:-20, // This controls the distance of the labels inside the pie
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              showInLegend: true
          }
      },
      // tooltip: {
      //     formatter: function() {
      //         return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
      //     }
      // },
     series :
     
           
             [{
          name: 'Browsers',
          data: [
  
              {
                  name : 'high Risk',
                  y : 50
              },
              {
                  name : 'Low Risk',
                  y : 12    
              },
              {
                  name : 'Medium Risk',
                  y : 60
              },
           
    
          ],

          size: '70%',
          innerSize: '60%',
          showInLegend:true,
          colors: ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF'],
          dataLabels: {
              enabled: true
          }
      }],
      annotations: [{
        labelOptions: {
          align: 'center',
          y: 50,
          allowOverlap: true
        },
        labels: [{
          point: {
            xAxis: 0,
            yAxis: 0,
            x: 0,
            y: 0
          },
          text: 'Click Me',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'blue',
            cursor: 'pointer'
          }
        }],

      
        events: {
          click: function () {
            alert('Button clicked!');
          }
        }
      }]
      
     
    }as Highcharts.Options);

    this.barchart = new Highcharts.Chart({
      chart: {
        renderTo: 'container1',
          type: 'bar'
      },
      title: {
          text: 'Historic World Population by Region',
          align: 'left'
      },
    
      xAxis: {
          categories: ['Environment', 'Maintenance', 'Population', 'Economics','Devices'],
          title: {
              text: null
          },
          gridLineWidth: 1,
          lineWidth: 0
      },
    
      tooltip: {
          valueSuffix: ' millions'
      },
      plotOptions: {
          bar: {
             // borderRadius: '50%',
              dataLabels: {
                  enabled: true,
                  format: '{point.y}%',
              },
              groupPadding: 0.1
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
       '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Year 1990',
          data: [
            {
              y:90
            },
            {
              y:85
            },
            {
              y:80
            },
            {
              y:75
            },
            {
              y:70
            },
            
            ]
      }, 
      ]
  }as Highcharts.Options);
  

  }
 
  
  
  // display: any;
  //   center: google.maps.LatLngLiteral = {
  //       lat: 22.2736308,
  //       lng: 70.7512555
  //   };
  //   zoom = 6;
  //   moveMap(event: google.maps.MapMouseEvent) {
  //     if (event.latLng != null) this.center = (event.latLng.toJSON());
  // }


  // move(event: google.maps.MapMouseEvent) {
  //     if (event.latLng != null) this.display = event.latLng.toJSON();
  // }

  
}
