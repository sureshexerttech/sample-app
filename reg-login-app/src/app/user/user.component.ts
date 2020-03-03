import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit,OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  error = false;
  public errorMsg: any;
  public userId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

    this.userId = localStorage.getItem("editUserId");
    if(this.userId){
      
        this.authService.getUserById(+this.userId)
          .subscribe( (data:any) => {
            console.log(data);
            if(data.success == 'Ok'){
            //this.registerForm.setValue(data.clientResponse);
            console.log(data.clientResponse.first_name);
            this.registerForm.controls.firstName.setValue(data.clientResponse[0].first_name);
            this.registerForm.controls.lastName.setValue(data.clientResponse[0].last_name);
            this.registerForm.controls.email.setValue(data.clientResponse[0].email);
            this.registerForm.controls.password.setValue(data.clientResponse[0].password);
            this.registerForm.controls.phone.setValue(data.clientResponse[0].phone_no);
            } else{
              console.log('error');
            }
          });
    }

  }

  ngOnDestroy() {
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
   if(!this.userId){
      this.authService.createUser(registerReq)
        .subscribe( (data:any) => {
          if(data.success == 'Ok'){
            this.router.navigate(['/home']);
          } else if(data.error == true){
            this.error = true;
            this.errorMsg = data.message;
          }
        });
    } else{
      this.authService.updateUser(this.userId, registerReq)
        .subscribe( (data:any) => {
          if(data.status == 'Ok'){
            localStorage.removeItem("editUserId");
            this.router.navigate(['/home']);
          } else if(data.status == 'error'){
            this.error = true;
            this.errorMsg = 'Update error Occured';
          }
        });
    }

 }

}
