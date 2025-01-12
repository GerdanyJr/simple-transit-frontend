import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { CommentResponse } from '../model/Comment.model';
import { ReportByIdResponse, ReportsResponse } from '../model/Report.model';
import { ReportsFilter } from '../types/Filter';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _baseUrl = "http://localhost:8080";

  private mockComments: CommentResponse = {
    currentPage: 1,
    pageNumber: 10,
    numberOfElements: 10,
    isLastPage: false,
    data: [
      {
        id: 512,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 34,
        username: "João da Silva",
        reportId: 89
      },
      {
        id: 134,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 12,
        username: "João da Silva",
        reportId: 45
      },
      {
        id: 890,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 67,
        username: "João da Silva",
        reportId: 23
      },
      {
        id: 342,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 89,
        username: "João da Silva",
        reportId: 56
      },
      {
        id: 764,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 42,
        username: "João da Silva",
        reportId: 19
      },
      {
        id: 341,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 23,
        username: "João da Silva",
        reportId: 67
      },
      {
        id: 765,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 98,
        username: "João da Silva",
        reportId: 45
      },
      {
        id: 214,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 56,
        username: "João da Silva",
        reportId: 78
      },
      {
        id: 123,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 31,
        username: "João da Silva",
        reportId: 54
      },
      {
        id: 879,
        comment: "Este é um comentário de exemplo.",
        date: "2025-01-11 15:32:20",
        userId: 22,
        username: "João da Silva",
        reportId: 99
      }
    ]
  };

  private mockReport: Observable<ReportByIdResponse> = of({
    id: 1,
    summary: "Queda de energia",
    description: "Houve uma queda de energia no bairro central, afetando vários estabelecimentos.",
    timestamp: "2025-01-10T10:30:00Z",
    address: "Rua Central, 123, Centro, Salvador, BA",
    latitude: -12.9714,
    longitude: -38.5014,
    userId: 101,
    username: "Bubinha",
    reportTypeId: 1,
    reportName: "Queda de energia"
  });

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
    return this.mockReport
      .pipe(delay(4000));
  }

  getComments(reportId: number): Observable<CommentResponse> {
    return of(this.mockComments)
      .pipe(delay(4000));
  }
}
