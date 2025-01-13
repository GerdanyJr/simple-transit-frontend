import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportType } from '../model/Report.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportTypeService {
  private _baseUrl = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  getReportTypes(): Observable<ReportType[]> {
    return this
      .httpClient
      .get<ReportType[]>(`${this._baseUrl}tipo-ocorrencias`)
  }
}
