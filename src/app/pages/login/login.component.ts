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
import { ValidationErrorResponse } from '../../types/Error';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  submit() {
    this
      .authService
      .login(
        this.loginForm.value.login,
        this.loginForm.value.password
      )
      .subscribe({
        next: () => this.router.navigate(["/"]),
        error: (err: HttpErrorResponse) => {
          switch (err.status) {
            case 403:
              this.toastr.error("Credenciais inválidas!", "Erro");
              break;

            case 400:
              Object
                .entries(err.error.errors as ValidationErrorResponse)
                .forEach(([field, message]) =>
                  this.toastr.error(message, `Erro no campo: ${field}`)
                );
              break;

            default:
              this.toastr.error("Ocorreu um erro inesperado", "Erro");
              break;
          }
        },
      });
  }
}
