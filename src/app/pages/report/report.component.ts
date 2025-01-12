import { Component, input, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommentFormComponent } from "../../components/comment-form/comment-form.component";
import { CommentsSectionComponent } from '../../components/comments-section/comments-section.component';
import { ReportService } from '../../services/report.service';
import { ReportByIdResponse } from '../../model/Report.model';
import { DatePipe } from '@angular/common';
import { CommentResponse } from '../../model/Comment.model';

@Component({
  selector: 'app-report',
  imports: [
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommentFormComponent,
    CommentsSectionComponent,
    DatePipe
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  id = input.required<number>();
  userId = 34;
  report = signal<ReportByIdResponse | undefined>(undefined);
  comments = signal<CommentResponse | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.isLoading.set(true);

    this
      .reportService
      .getReportById(this.id())
      .subscribe({
        next: report => this.report.set(report),
      });

    this
      .reportService
      .getComments(this.id())
      .subscribe({
        next: comments => this.comments.set(comments),
        complete: () => this.isLoading.set(false)
      });
  }

  onCommentSubmit(comment: string) {
    console.log(comment);
  }

  onCommentDelete(commentId: number) {
    console.log(commentId);
  }
}
