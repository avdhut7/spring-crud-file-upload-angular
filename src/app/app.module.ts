import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeService } from './service/employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
