import { Component , Output,EventEmitter } from '@angular/core';
import { HoneywellService } from 'src/app/Services/honeywell.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  highlightedIcon: string = '';

  highlightIcon(icon: string) {
    this.highlightedIcon = icon;
  }
  constructor(private honeywellService :HoneywellService){}

 

  fireDepartement() {
    this.honeywellService.fireStation.emit(true);
  }

  viewIncidents(){
    this.honeywellService.fireStation.emit(true);
  }

}




