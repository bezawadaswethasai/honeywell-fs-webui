import { Component,OnInit } from '@angular/core';
import { HoneywellService } from 'src/app/Services/honeywell.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  firstname="string"
  userDetails=[]
  highlightedIcon: string = '';

  highlightIcon(icon: string) {
    this.highlightedIcon = icon;
  }
  constructor(private authService : AuthService ){
 
  }

  ngOnInit(){
    const userDetails = this.authService.getloginresponse();
    console.log("user",userDetails)
  }
}

