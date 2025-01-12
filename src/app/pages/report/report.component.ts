import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommentFormComponent } from "../../components/comment-form/comment-form.component";
import { CommentsSectionComponent } from '../../components/comments-section/comments-section.component';
import { ReportService } from '../../services/report.service';
import { ReportByIdResponse } from '../../model/Report.model';
import { DatePipe } from '@angular/common';
import { CommentResponse } from '../../model/Comment.model';
import { CommentsService } from '../../services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
export class ReportComponent implements OnInit, OnDestroy {
  id = input.required<number>();
  report = signal<ReportByIdResponse | undefined>(undefined);
  comments = signal<CommentResponse | undefined>(undefined);
  isLoading = signal<boolean>(false);
  isAuthenticated = signal<boolean>(false);

  private _authSub!: Subscription;

  constructor(
    private reportService: ReportService,
    private commentService: CommentsService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoading.set(true);

    this._authSub = this
      .authService
      .user
      .subscribe(value => this.isAuthenticated.set(!!value))

    this
      .reportService
      .getReportById(this.id())
      .subscribe({
        next: report => this.report.set(report),
      });

    this
      .reportService
      .getReportComments(this.id())
      .subscribe({
        next: comments => this.comments.set(comments),
        complete: () => this.isLoading.set(false)
      });
  }

  ngOnDestroy(): void {
    this._authSub.unsubscribe();
  }

  onCommentSubmit(comment: string) {
    this
      .commentService
      .createComment(comment, this.id())
      .subscribe({
        next: () => this.toastr.success("Comentário criado com sucesso", "Sucesso"),
        error: (err: HttpErrorResponse) => this.toastr.error(err.error.message, "Erro")
      });
  }


}
