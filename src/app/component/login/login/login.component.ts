import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/users/user.service';
import { AuthService } from 'src/app/service/auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService, // Asegúrate de inyectar AuthService
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.userService.login(this.formGroup.value).subscribe(
        (response: any) => {
          console.log('Token:', response.token);
          this.authService.login(response.token); // Almacena el token
          this.snackBar.open('Iniciaste sesión correctamente!', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          // Redirigir al usuario a 'list-product'
          this.router.navigate(['/list-product']);
        },
        (error: any) => {
          console.error('Login failed:', error);
          this.snackBar.open('Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }
}
