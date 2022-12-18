import { Component,OnInit } from '@angular/core';
import { LocalService } from './local.service';
import { UserService } from './user.service';
import { User } from './_models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aloteb';
  user_info: User | any;
  constructor(
    private localStorage: LocalService,
    private router: Router,
    public userservice: UserService
  ) {
    try {
      this.user_info = this.userservice.getCurrentUser();
      if (!this.user_info || !this.user_info['token'] ) {
        this.localStorage.removeData('current_user');
        this.router.navigate(['/']);
      }
    }
    catch (e) {
    }
  }
  ngOnInit() {
    // this.get_all_user();
  }
}
