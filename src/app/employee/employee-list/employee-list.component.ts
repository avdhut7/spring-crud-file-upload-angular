import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/api.response';
import { EmployeeService } from 'src/app/service/employee.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<ApiResponse> | undefined;
  fileName= 'ExcelSheet.xlsx';
  filenames: string[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void 
  {
    this.employees=this.employeeService.getEmployees();
    setTimeout(function(){
      $(function(){
        $('#example').DataTable();
    });
    },2000);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.employees = this.employeeService.getEmployees();
        },
        error => console.log(error));
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }

  exportEmployee(){
    this.employeeService.exportEmployee().subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('example');
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


  onDownloadFiles(filename : string): void
  {
    this.employeeService.download(filename).subscribe(
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
