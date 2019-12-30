import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signInForm: FormGroup;
  errorRes: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onFormSubmit() {
    const formValue = this.signInForm.value;
    this.authService.logIn(formValue.email, formValue.password)
        .subscribe(resData => {
          console.log(resData);
          // todo this.router.navigate('/eventsGrid');
        }, error => {
          this.errorRes = error;
        });
  }
}
