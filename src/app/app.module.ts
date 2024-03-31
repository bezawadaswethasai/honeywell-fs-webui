import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './Components/register/register.component';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  HttpClientModule
} from '@angular/common/http';
import { HoneywellService } from './Services/honeywell.service';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
//import { GoogleMapsModule } from '@angular/google-maps'
import {AgmCoreModule} from '@agm/core';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { SidebarComponent } from './Components/sidebar/sidebar.component';



//import { AuthGuard } from './auth/auth.guard';
//import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule,
    MatDialogModule,
    MatTableModule,
    //GoogleMapsModule,
    ToastrModule.forRoot(
      

    ),
    //GoogleMapsModule
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCt9tUNHmE-uhYv9osBZXQEHKf0hi8o7SQ'
    })
 
    


  ],
  providers: [HoneywellService],
  bootstrap: [AppComponent]
})
export class AppModule { }
