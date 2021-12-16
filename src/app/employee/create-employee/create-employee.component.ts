import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createForm = new FormGroup({
    name : new FormControl('', Validators.required)
  })

  employee:Employee = new Employee();
  submitted= false;
  fileName= 'ExcelSheet.xlsx';

  selectedFiles: FileList | any;
  currentFile: File | any;
  progress = 0;
  message = '';


  constructor(private employeeService: EmployeeService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.submitted=true;
    this.employeeService.createEmployee(this.employee).subscribe(
      data=>console.log(data), error=>console.log(error)
    );
    this.employee= new Employee();
    this.router.navigate(['/employees']);
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('emp-excel');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  onUploadFiles(files : File[]): void
  {
    const formData= new FormData();
    for (const file of files) {formData.append('file', file, file.name); }
    this.employeeService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  private reportProgress(httpEvent: HttpEvent<JSON[] | Blob>): void {
    switch(httpEvent.type)
    {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
    }
  }
  
  updateStatus(loaded: number, total: number | undefined, arg2: string) {
    throw new Error('Method not implemented.');
  }
}




