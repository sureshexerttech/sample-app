import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  users: User[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUsers()
    .subscribe( (data:any) => {
      this.users = data.clientResponse;
    });
  }

  deleteUser(user:any): void {
     this.authService.deleteUser(user)
       .subscribe( (data:any) => {
         console.log(data);
         //this.users = this.users.filter(u => u !== user);
         this.router.navigate(['/home']);
       })
  };

  editUser(user: any): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user);
    this.router.navigate(['/userOptions']);
  };

  addUser() {
    localStorage.removeItem("editUserId");
    this.router.navigate(['/userOptions']);
  };

}
