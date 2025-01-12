import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Comment } from '../../model/Comment.model';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-comments-section',
  imports: [
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DatePipe
  ],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss'
})
export class CommentsSectionComponent {
  isLoading = input<boolean>(false);
  comments = input.required<Comment[]>();
  numberOfComments = input.required<number>();
  userId = input.required<number>();
  commentDelete = output<number>();
}
