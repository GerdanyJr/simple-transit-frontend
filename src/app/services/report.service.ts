import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReportReq, ReportByIdResponse, ReportsResponse } from '../model/Report.model';
import { ReportsFilter } from '../types/Filter';
import { HttpClient } from '@angular/common/http';
import { CommentResponse } from '../model/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getReports(page = 0, filter?: ReportsFilter): Observable<ReportsResponse> {
    let uri = `${this._baseUrl}/ocorrencias?page=${page}`;

    if (filter?.address) {
      uri += `&address=${filter.address}`;
    }

    if (filter?.reportTypeId) {
      uri += `&reportTypeId=${filter.reportTypeId}`;
    }

    if (filter?.keyword) {
      uri += `&keyword=${filter.keyword}`;
    }

    if (filter?.sortDirection) {
      uri += `&sortDirection=${filter.sortDirection}`;
    }

    if (filter?.sortBy) {
      uri += `&sortBy=${filter.sortBy}`;
    }

    console.log(uri);

    return this
      .httpClient
      .get<ReportsResponse>(uri);
  }

  getReportById(id: number): Observable<ReportByIdResponse> {
    return this
      .httpClient
      .get<ReportByIdResponse>(`${this._baseUrl}/ocorrencias/${id}`);
  }

  getReportComments(reportId: number): Observable<CommentResponse> {
    return this
      .httpClient
      .get<CommentResponse>(`${this._baseUrl}/ocorrencias/${reportId}/comentarios`)
  }

  createReport(req: CreateReportReq) {
    return this
      .httpClient
      .post(`${this._baseUrl}/ocorrencias/`, req);
  }

}
