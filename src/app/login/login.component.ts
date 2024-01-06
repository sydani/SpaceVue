import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  private  router = inject(Router);
  private  _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
   
    if(this.loginForm.get('username')?.value === "admin" &&
      this.loginForm.get('password')?.value ==="abc123") {
        this.router.navigateByUrl("dashboard");
      } else {
        this.openSnackBar();
      }
  }


  openSnackBar() {
    this._snackBar.open('Please enter valid credentials', 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snackbar-danger',
      duration: 3000,
    });
  }


}
