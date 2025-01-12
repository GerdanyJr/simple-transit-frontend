import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private _baseUrl = "http://localhost:8080/comentarios/";

  constructor(private httpClient: HttpClient) { }

  createComment(comment: string, reportId: number) {
    return this
      .httpClient
      .post(`${this._baseUrl}`, { comment, reportId, date: new Date() });
  }

}
