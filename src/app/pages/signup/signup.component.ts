import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required, Validators.minLength(5)]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    });
  }

  onSubmit() {
    this
      .authService
      .register(
        this.signupForm.value.name,
        this.signupForm.value.login,
        this.signupForm.value.password
      ).subscribe({
        next: () => {
          this.toastr.success("Usuário registrado com sucesso", "Sucesso")
          this.router.navigate(["/auth/login"])
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 409) {
            this.toastr.error(err.error.message, "Erro")
          } else {
            this.toastr.error("Ocorreu um erro inesperado", "Erro")
          }
        },
      });;
  }
}
