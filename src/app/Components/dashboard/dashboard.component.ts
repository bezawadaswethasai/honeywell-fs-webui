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
import {FormGroup, FormControl,FormBuilder,Validators} from '@angular/forms';
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
interface Item {
  id: number;
  itemName: string;
  selected: boolean;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {


  public lat = 51.678418;public lng = 7.809007;
public origin: any;public destination: any

  latitude = 51.678418;
  longitude = 7.809007;
  zoom = 12;
  
 gmapDetails:any;
 fireDepartementdetailslat:any={}
 fireDepartementdetailslng:any={}
 fireDepartementdetails:any=[]
 viewIncidentdetails:any=[]
 showFireDepartmentMarkers = false;
 showIncidentMarkers = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  form: FormGroup | undefined;

  responseData: any;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  selectedZipCode: string[]=[]; 
  selectedRegion:string[]=[];
  fromDate!: Date;
  toDate!: Date;
  zipCodes = [  ["99501"] ,["99502"]];
  regions= [["Alaska"],["Arizona"],["Arkansas"]];
   chart:any;
   barchart : any;
   selectedMapType: string = 'roadmap';

 selectedValue!: "string";
  years =["2018","2019","2020","2021","2022","2023","2024"];
  selectedYear:any="";
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
  loginResponse: any;

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
 

  dropdownList: Item[] = [
    { id: 1, itemName: 'Fire Stations',selected: false },
    { id: 2, itemName: 'Risk Score' ,selected: false},
    { id: 3, itemName: 'Incident' ,selected: false},
    { id: 4, itemName: 'Hydrant',selected: false },
    
  ];
  selectedItems: Item[] = [];
  isDropdownOpen = false;

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCheckboxChange(event: any, item: Item) {
    item.selected = event;
    
    if (item.itemName === "Fire Stations") { // Use '===' for comparison

     
        this.fireDepartementdetails = this.gmapDetails.locations.fireDepartment
     // this.viewIncidentdetails = this.gmapDetails.locations.incidents
        // console.log('ViewIncident',this.viewIncidentdetails)
        console.log('FireIncident',this.fireDepartementdetails)
         
      
      // Handle when itemName is "Fire Station"
        console.log('fire', this.fireDepartementdetails); // Example log statement
    } else {
        // Handle when itemName is not "Fire Station"
        console.log('Not fire', this.viewIncidentdetails); // Example log statement
    }
    console.log(event); // Log the event
    console.log(item); // Log the item
}


  isSelected(item: Item): boolean {
    return this.selectedItems.findIndex(selectedItem => selectedItem.id === item.id) > -1;
  }
  constructor(public dialog: MatDialog,private authService: AuthService,private honeywellservice :HoneywellService, private formBuilder: FormBuilder) {
    this.dialogTemplate = {} as TemplateRef<any>
    this.honeywellservice.fireStation.subscribe((showFireDepartmentMarkers: boolean) => {
      this.showFireDepartmentMarkers = showFireDepartmentMarkers;
      this.showIncidentMarkers = !showFireDepartmentMarkers;
    });
    
  

    
   }



  // onCheckboxChange(event: any, item: Item) {
  //   if (event.target.checked) {
  //     this.selectedItems.push(item);
  //   } else {
  //     this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem.id !== item.id);
  //   }
  // }
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

    this.honeywellservice.fireStation.subscribe((Response)=>{
      if(Response){
        this.fireDepartementdetails = this.gmapDetails.locations.fireDepartment
        this.viewIncidentdetails = this.gmapDetails.locations.incidents
        console.log('ViewIncident',this.viewIncidentdetails)
        console.log('FireIncident',this.fireDepartementdetails)
         console.log('latitude',this.fireDepartementdetailslat)
         console.log('lng',this.fireDepartementdetailslng)
         this.origin = { lat: 51.678418, lng: 7.815982 };this.destination = { lat: 51.678418, lng: 7.815982 };
         console.log('Origin:', this.origin);
         console.log('Destination:', this.destination);
      }
    })

  const regionzipcodeDetails = this.authService.getloginresponse();

  console.log(regionzipcodeDetails);
    //this.honeywellservice.getData();
    //this.honeywellservice.sendDataToBackend(data);
   
    this.form = this.formBuilder.group({
      selectedRegion: ['', Validators.required],
      selectedZipCode: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
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
  
  

    // this.chart = new Highcharts.Chart({
    //   chart: {
    //      renderTo: 'container',
    //       type: 'pie'
    //   },
    //   title: {
    //       text: 'Risk Index',
    //       align:'left',
         
    //   },
    //   subtitle:{
    //     text :'Total as on March 06,2024',
    //     align : 'left'
    //   },
      
    //   yAxis: {
    //       title: {
    //           text: 'Total percent market share'
    //       }
    //   },
     
    //   plotOptions: {
    //       pie: {
    //           allowPointSelect: true,
    //           cursor: 'pointer',
    //           dataLabels: {
    //               enabled: true,
    //               format: '{point.y}%',
    //               distance:-20, // This controls the distance of the labels inside the pie
    //               style: {
    //                   fontWeight: 'bold',
    //                   color: 'white'
    //               }
    //           },
    //           showInLegend: true
    //       }
    //   },
    //   // tooltip: {
    //   //     formatter: function() {
    //   //         return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
    //   //     }
    //   // },
    //  series :
     
           
    //          [{
    //       name: 'Browsers',
    //       data: [
  
    //           {
    //               name : 'high Risk',
    //               y : 50
    //           },
    //           {
    //               name : 'Low Risk',
    //               y : 12    
    //           },
    //           {
    //               name : 'Medium Risk',
    //               y : 60
    //           },
           
    
    //       ],

    //       size: '70%',
    //       innerSize: '60%',
    //       showInLegend:true,
    //       colors: ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF'],
    //       dataLabels: {
    //           enabled: true
    //       }
    //   }],
    //   annotations: [{
    //     labelOptions: {
    //       align: 'center',
    //       y: 50,
    //       allowOverlap: true
    //     },
    //     labels: [{
    //       point: {
    //         xAxis: 0,
    //         yAxis: 0,
    //         x: 0,
    //         y: 0
    //       },
    //       text: 'Click Me',
    //       style: {
    //         fontSize: '14px',
    //         fontWeight: 'bold',
    //         color: 'blue',
    //         cursor: 'pointer'
    //       }
    //     }],

      
    //     events: {
    //       click: function () {
    //         alert('Button clicked!');
    //       }
    //     }
    //   }]
      
     
    // }as Highcharts.Options);

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


selectYear(year:any){
  this.selectedYear = year
  const data = {
    zipCode: this.selectedZipCode,
    region: this.selectedRegion,
    year: this.selectedYear,
   
};

this.honeywellservice.getIncident(data).subscribe(response => {
   this.gmapDetails = response
    console.log('Response from backend:', this.gmapDetails);
    console.log(this.fromDate,this.toDate);
});
}


 
onSubmit() {
  if (this.form?.valid) {
    // Form is valid, perform form submission or other actions
    console.log('Form submitted successfully');
  } else {
    // Form is invalid or not initialized
  }
}

clearForm() {
  this.form?.reset();
}

  


showIncidents() {
  const data = {
      zipCode: this.selectedZipCode,
      region: this.selectedRegion,
      fromDate: this.fromDate,
      toDate: this.toDate
  };

  this.honeywellservice.getIncident(data).subscribe(response => {
     this.gmapDetails = response
      console.log('Response from backend:', this.gmapDetails);
      console.log(this.fromDate,this.toDate);
  });
}
  

  
 

 

}
