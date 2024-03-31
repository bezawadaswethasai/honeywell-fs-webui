import { Component , Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() incidentTypeSelected = new EventEmitter<string>();

  showIncidents(incidentType: string) {
    this.incidentTypeSelected.emit(incidentType);
  }
}
