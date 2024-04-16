import { Component ,Input } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-riskindex',
  templateUrl: './riskindex.component.html',
  styleUrls: ['./riskindex.component.scss']
})
export class RiskindexComponent {
  @Input() item = ''; 
  zipCodes = [  ["99501"] ,["99502"]];
  regions= [["Alaska"],["Arizona"],["Arkansas"]];
constructor(private router : Router){

}
ngOnInit(){
  
}
dashboardpage(){
  this.router.navigate(['/dashboard']);
}

}


