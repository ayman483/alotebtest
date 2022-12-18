import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  show_error: boolean = false;
  loading: boolean = false;
  submitted = false;
  returnUrl: string = '';
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private localStorage: LocalService,
  ) {
    this.user = new User;
    // redirect to User list if already logged in
    if (this.localStorage.getData('current_user')) {
      this.router.navigate(['users']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  checked() {
    if (!this.loginForm.invalid)
      return true;
    return false;
  }

  // for accessing to form fields
  get fval() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userservice.login(this.fval.username.value, this.fval.password.value)
      .subscribe(
        data => {
          if (data) {
            this.localStorage.saveData('current_user', JSON.stringify(data));
            this.router.navigate(['users']);
            // let curUser: any;
            // try {
            //   curUser = this.localStorage.getItem("current_user");
            // }
            // catch (e) {
            // }
          } else {
            this.loading = false;
            this.show_error = false;
          }
        });
  }
}
