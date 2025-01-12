import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {
  comment = signal<string>("");
  isUserLoggedIn = input.required<boolean>();
  commentSubmit = output<string>();

  constructor(private router: Router) { }

  onSubmit() {
    if (this.isUserLoggedIn()) {
      this.commentSubmit.emit(this.comment());
    } else {
      this.router.navigate(["auth/login"]);
    }
  }
}
