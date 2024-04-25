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
import * as echarts from 'echarts';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AnimationPlayer, style } from '@angular/animations';
import { count } from 'rxjs';




export interface PeriodicElement {
  name: string;
  position: number;

 
}



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
  

 

  Address:any;
 gmapDetails:any;
 riskscoresZipcode:any=[];
 riskscores :any=[] //view by zip code riskscore values
 zipcodes :any=[] //view by zip code zipcodes values
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  form: FormGroup | undefined;

  responseData: any;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  selectedZipCode: string[]=[]; 
  viewbyzipcodeDetails : any=[] //display view zipcodes and risk score on click on modal
  selectedRegion:any=[];
  selectedRegions:any=[]
  selectedZipCodes:any=[]
  zipcodeslength:any=[]
  fromDate!: Date;
  toDate!: Date;
   chart:any;
   barchart : any;
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

 


 
  apiData: any;
  loginResponse: any;

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
 
  constructor(public dialog: MatDialog,private authService: AuthService,private honeywellservice :HoneywellService, private formBuilder: FormBuilder,private router: Router, private renderer :Renderer2 ,private elementRef: ElementRef) {
    this.dialogTemplate = {} as TemplateRef<any>
   }

 


 
  // onCheckboxChange(event: any, item: Item) {
  //   if (event.target.checked) {
  //     this.selectedItems.push(item);
  //   } else {
  //     this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem.id !== item.id);
  //   }
  // }
  selectOption(option: string): void {
    console.log('Selected option:', option);
    // You can perform additional actions here based on the selected option
  }
  ngOnInit() {
  
   
   
    // setTimeout(() => {
    //   this.barChart();
    // }, 1000);

    // this.honeywellservice.fireStation.subscribe((Response)=>{
    //   if(Response){
        
    //     this.fireDepartementdetails = this.gmapDetails.locations.fireDepartment
    //     this.viewIncidentdetails = this.gmapDetails.locations.incidents
    //     console.log('ViewIncident',this.viewIncidentdetails)
    //     console.log('FireIncident',this.fireDepartementdetails)
    //      console.log('latitude',this.fireDepartementdetailslat)
    //      console.log('lng',this.fireDepartementdetailslng)
         
    //      console.log('address',this.Address);

    //   }
    // })


  const regionzipcodeDetails = this.authService.getloginresponse();
  this.Address = regionzipcodeDetails.address
  this.selectedRegions = regionzipcodeDetails.region
  this.selectedZipCodes =regionzipcodeDetails.zip_code
  console.log('Address',this.Address);
  console.log('loginResponse',this.selectedZipCodes)
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
  
    
  

    this.chart = new Highcharts.Chart({
      chart: {
         renderTo: 'container2',
          type: 'gauge'
      },
      pane: {
        startAngle: -90,
        endAngle:  89.9,
        background: [{
            backgroundColor: '#ffffff',
            borderWidth: 1,
            outerRadius: '105%',
            innerRadius: '103%'
        }],
        center: ['50%', '50%'],
        size: '85%'
    },
  
      yAxis: {
          title: {
              text: 'Total percent market share'
          }
      },
    
   
     
     series :
     
           
             [
              {
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
      }
    ],
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







selectYear(year:any){
  this.selectedYear = year
  const data = {
    zipCode: this.selectedZipCodes,
    region: this.selectedRegions,
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

//   this.honeywellservice.getRiskScore(data).subscribe(response => {
//     this.riskscoresZipcode = response
//      console.log('Zipcode Responses:', this.riskscoresZipcode);
//  });
}
  
//view By Zip-code API



getZipRiskScore(){
  const data ={
    zipCode : this.selectedZipCodes
    
  }
  console.log('zipcodevalue',this.selectedZipCodes)
  this.honeywellservice.getZipRiskScore(data).subscribe(response => {
    this.viewbyzipcodeDetails = response;
   this.riskscores= this.viewbyzipcodeDetails.riskScore
   this.zipcodes= this.viewbyzipcodeDetails.zipCodes
   this.zipcodeslength= this.zipcodes.length

    console.log('view by riskcores',this.riskscores)
    console.log('view by zipcode',this.zipcodes)

  });
}

  // this.honeywellservice.getZipRiskScore().subscribe(response => {
  //     this.riskscoresZipcode = response
   
  //    });

  


  
 

 

}
