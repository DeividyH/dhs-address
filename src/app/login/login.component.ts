import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticateService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authenticationService: AuthenticateService,
    private toastr: ToastrService
  ) {
    //redirect to home if already logged in
    if (this._authenticationService.currentUserValue)
      this.router.navigate(['/']);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //get return url fron route parameters or fedault to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
      return;

    this.loading = true;
    this._authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      },
        error => {
          this.error = error;
          this.loading = false;

          this.toastr.error(error);
        });
  }

}
