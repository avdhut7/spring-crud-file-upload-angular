import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api.response';
import { Employee } from '../model/employee.model';
import {HttpClient, HttpEvent} from '@angular/common/http';


@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = 'http://localhost:9097/api/employees/';

  

  getEmployees() : Observable<ApiResponse>  {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }

  createEmployee(employee: Employee): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + employee.id, employee);
  }

  deleteEmployee(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }

  exportEmployee(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl + "export/excel");
  }

  upload(formData : FormData): Observable<HttpEvent<JSON[]>>
  {
    console.log("done")
    return this.http.post<JSON[]>(`http://localhost:9097/api/upload`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });
  }

  download(fileName : string): Observable<HttpEvent<Blob>>
  {
    return this.http.get(`http://localhost:9097/api/download/${fileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
  
}