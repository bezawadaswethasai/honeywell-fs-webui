import { Component , Output,EventEmitter } from '@angular/core';
import { HoneywellService } from 'src/app/Services/honeywell.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private honeywellService :HoneywellService){}

  fireDepartement() {
    this.honeywellService.fireStation.emit(true);
  }

  
}
