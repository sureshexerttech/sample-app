import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  success = false;
  error = false;
  public successmesssage: any;
  public errorMsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['',[Validators.required,Validators.pattern("^[0-9]*$")]]
    });
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    const registerReq = {
      firstname: this.registerForm.controls.firstName.value,
      lastname: this.registerForm.controls.lastName.value,
      username: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      phone: this.registerForm.controls.phone.value,
    }

    this.authService.createUser(registerReq)
      .subscribe( (data:any) => {
        if(data.success == 'Ok'){
          this.success = true;
          this.error = false;
          this.successmesssage = data.message;
        } else if(data.error == true){
          this.error = true;
          this.success = false;
          this.errorMsg = data.message;
        }
      });

  }

}
