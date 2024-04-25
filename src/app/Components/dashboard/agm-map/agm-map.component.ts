import { Component , Input } from '@angular/core';
import { HoneywellService } from 'src/app/Services/honeywell.service';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { DashboardComponent } from '../dashboard.component';

  interface Item {
  id: number;
  itemName: string;
  selected: boolean;
}


@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent {
  @Input() selectedZipCodes: any;
  @Input() selectedRegions: any;
  @Input() selectedYear: any;
  @Input() gmapDetails: any;

  


  latitude = 51.678418;
  longitude = 7.809007;
  zoom = 12;
  Address:any;
 //gmapDetails:any;
 fireDepartementdetails:any=[]
 viewIncidentdetails:any=[]
 fireDepartementdetailslat:any={}
 fireDepartementdetailslng:any={}
 selectedMapType: string = 'roadmap';
 selectedItems: Item[] = [];
 selectedDropdownItem: Item | null = null;
 isDropdownOpen = false;
 showFireDepartmentMarkers = false;
 showIncidentMarkers = false;
 dropdownList: Item[] = [
  { id: 1, itemName: 'Fire Stations',selected: false },
  { id: 2, itemName: 'Risk Score' ,selected: false},
  { id: 3, itemName: 'Incident' ,selected: false},
  { id: 4, itemName: 'Hydrant',selected: false },
  
];
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
  
  this.fireDepartementdetails =[]
  this.viewIncidentdetails=[]
  
  if (item.itemName === "Fire Stations" && item.selected) { 
   this.fireDepartementdetails = this.gmapDetails.locations.fireDepartment;
    console.log('Fire Stations selected. Details:', this.fireDepartementdetails);

} else if (item.itemName === "Incident" && item.selected) {
    this.viewIncidentdetails = this.gmapDetails.locations.incidents;
    
    console.log('Incident selected. Details:', this.viewIncidentdetails);
} else {
    console.log('Unknown selection:', item.itemName);
}
  console.log(event); // Log the event
  console.log(item); // Log the item
}

isSelected(item: Item): boolean {
  return this.selectedItems.findIndex(selectedItem => selectedItem.id === item.id) > -1;
}
 constructor( private honeywellservice :HoneywellService, private dashboard : DashboardComponent){
  this.honeywellservice.fireStation.subscribe((showFireDepartmentMarkers: boolean) => {
    this.showFireDepartmentMarkers = showFireDepartmentMarkers;
    this.showIncidentMarkers = !showFireDepartmentMarkers;
    

  });
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
       console.log('address',this.Address);

    }
  })
  
  
}

ngOnChanges(){
console.log('selectedZipCodes',this.selectedZipCodes)
console.log('selectedRegions',this.selectedRegions)
console.log('selectedYear',this.selectedYear)
console.log('GmapDetails',this.gmapDetails)
}
}
