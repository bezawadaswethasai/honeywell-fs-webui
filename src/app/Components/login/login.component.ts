import { Component , OnInit ,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { HoneywellService } from 'src/app/Services/honeywell.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginresponse :any;

  loginForm!: FormGroup;
  result=[]
 
  private formSubmitAttempt : boolean | undefined
  form: any;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService, private honeywellService : HoneywellService,private toastr: ToastrService) { }

 
  storeResponseData(response: any): void {
    // Call the setResponseData method of the common service to store the response
    this.honeywellService.setResponseData(response);
  }

  getStoredResponseData(): void {
    // Call the getResponseData method of the common service to retrieve the stored response
    const storedResponse = this.honeywellService.getResponseData();
    console.log('Stored Response:', storedResponse);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      password: ['', Validators.required]
    });
  }
   

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }
  
  

  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const usernameControl = this.loginForm.get('username');
        const passwordControl = this.loginForm.get('password');
    
        if (usernameControl && passwordControl && usernameControl.value && passwordControl.value) {
          const username = usernameControl.value;
          const password = passwordControl.value;

        this.authService.login(username, password).subscribe(
          response => {
            let result = response;
            const department = response.department;
            this.authService.setloginresponse(response.departmentDetails);
            // this.authService.setUser(response)
            // const department = this.authService.getUserDepartment();
            // sessionStorage.setItem('department', department);
            
            this.navigateToDepartmentPage(department);
            
            //alert('Hello:response.department')
            this.toastr.success(response.message, 'Success',{timeOut : 3000});
            console.log('Login successful:',response);
          },
          error => {
            this.toastr.error(error.response.message, 'Error');
            // Handle login error
            console.error('Login error:',error);
          }
          
        );
        
      }
      
    // this.formSubmitAttempt = true;
    // if (this.loginForm.valid) {
    //   console.log(this.loginForm.value); // Handle form submission
    // }
  }
  
  
}

navigateToDepartmentPage(department: string): void {
console.log('hi', department)  
  switch(department) {
    case 'Fire':
      this.router.navigate(['/']);
      break;
    case 'Firemarshall':
      this.router.navigate(['/register']);
      break;
   
    default:
      this.router.navigate(['/404']);
      break;
  }
}


  
  OnClick(){
    this.router.navigate(['/register']);
  }
}
