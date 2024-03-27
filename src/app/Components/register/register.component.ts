import { Component , OnInit } from '@angular/core';
import { HoneywellService } from 'src/app/Services/honeywell.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  inputData: any = {}; 
  "userId": "integer";
  "userName": "string";
  "password": "string";
  "email": "string";
  "mobileNo": "string";
  "address": "string";

  Roles: any = ['Admin', 'Author', 'Reader'];
constructor( private honeywellService:HoneywellService ) { }


//inputData : any;
ngOnInit() {
  
  this.PostData(this.inputData)
  }

  
    // subscribe to the Observable to make the HTTP call
    
  

  PostData(data: any): void {
    let inputData ={
  
     id: this.inputData.userId,
    userName: this.inputData.userName,
    pasword: this.inputData.password,
    email: this.inputData.email,
    mobileNo: this.inputData.mobileNo,
    address: this.inputData.address
      
    }
    this.honeywellService.register(data).subscribe(
      (response) => {
        console.log('Registration successful!', response);
        // Additional logic after successful registration
      },
      (error) => {
        console.log('Registration failed!', error);
        // Handle registration failure
      }
    );
  }

  // getapi(){
  // this.honeywellService.getPosts().subscribe((posts) => {
      
  //     console.log(posts);
  //   });
  // }
}
