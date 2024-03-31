import { Component, OnInit ,TemplateRef, ViewChild,ElementRef,Renderer2} from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartOptions } from 'highcharts';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { MouseEvent } from '@agm/core';
import { AuthService } from 'src/app/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { google } from '@agm/core/services/google-maps-types';
import {FormGroup, FormControl,FormBuilder} from '@angular/forms';
import { HoneywellService } from 'src/app/Services/honeywell.service';




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




interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  form: FormGroup | undefined;

  responseData: any;
  
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
   chart:any;
   barchart : any;

 selectedValue!: "string";
//   lat = 21.3069; 

//   lng = -157.8583; 

//  mapType = 'roadmap';
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  incidents: { latitude: number, longitude: number }[] = [];
  //mapType = 'satellite';

  

 
 

  


 

  
  cards = [
    { title: 'Card 1', content: 'Content of Card 1' },
    { title: 'Card 2', content: 'Content of Card 2' },
    { title: 'Card 3', content: 'Content of Card 3' },
    { title: 'Card 4', content: 'Content of Card 4' },
    // Add more cards as needed
  ];


  displayedColumns: string[] = ['position', 'name', ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  apiData: any;

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
 
  constructor(public dialog: MatDialog,private authService: AuthService,private honeywellservice :HoneywellService, private formBuilder: FormBuilder) {
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
  selectOption(option: string): void {
    console.log('Selected option:', option);
    // You can perform additional actions here based on the selected option
  }
  
  
  ngOnInit() {
    this.fetchData();
    this.form = this.formBuilder.group({
      city: [''],
      zipCodes: [[]],
      start: [''],
      end: ['']
    });

    // selectCity(city: string): void {
    //   this.form.patchValue({ city });
    // }
    /* APPLY BUTTON */
    // applyFilters(): void {
    //   if (this.form.valid) {
    //     const formData = this.form.value;
    //     // Send formData to backend API
    //     console.log('Form Data:', formData);
    //   } else {
    //     console.log('Form is invalid');
    //   }
    // }

    /*CLEAR BUTTON*/
    // clearFilters(): void {
    //   this.form.reset();
    // }
  
  

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
  
  // this.authService.login().subscribe(
  //   (data: any) => {
  //     this.apiData = data;
  //   },
  //   (error: any) => {
  //     console.error('Error fetching data:', error);
  //   }
  // );
 
 
  
 
}
 
  
fetchData(): void {
  this.honeywellservice.getData().subscribe(
    (data) => {
      this.responseData = data;
      // Optionally, you can store the response in a centralized location in the service
      this.honeywellservice.setResponse(data);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  },
    
  ]

  showIncidents(incidentType: string) {
    // Add logic to fetch incident locations for the selected type and display markers on the map
    this.incidents = [
      { latitude: 51.678418, longitude: 7.809007 }, // Example incident location
      // Add more incident locations as needed
    ];


   

  
  }

}
