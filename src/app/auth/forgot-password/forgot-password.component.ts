import { HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Title, Meta } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  signinForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;
  public user: User;
  private subs = new SubSink();
  public inputType: string = 'password'
  public showPass: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private titleService: Title,
    private metaTagService: Meta
    ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.signinForm.get(field).valid && this.signinForm.get(field).touched) ||
      (this.signinForm.get(field).untouched && this.submitted)
    );
  }
  // getter for easy access to form fields.
  get f() { return this.signinForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.spinner.show();
    const body = new HttpParams()
      .set('email', this.f.email.value)
    this.subs.sink = this.authService.forgotPassword(body).subscribe((response: any) => {
      this.spinner.hide();
      this.submitted = false;
      this.signinForm.reset();
      Swal.fire(
        'Sent!',
        'Reset password link has been sent successfully! Please check your Mail box to reset your password!',
        'success'
      )
      this.router.navigate([`/`]);
    }, (err: HttpErrorResponse) => {
      this.spinner.hide();
      this.submitted = false;
      if (err.status == 400) {
        Swal.fire(
          'Invalid',
          'Please enter valid email id!',
          'error'
        )
      } else {
        this.toastr.error('Something went wrong!!');
      }
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onboardingCarouselOptions: OwlOptions = {
    loop: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

}
