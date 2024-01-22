import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.RegisterForm.valid) {
      // console.log(this.RegisterForm.value);
      this.auth.Register(this.RegisterForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.RegisterForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    } else {
      this.validateAllFormFields(this.RegisterForm);
      alert('Form is not filled');
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
