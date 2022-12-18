import { Component, OnInit } from '@angular/core';
import { User, Log } from './../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LocalService } from '../local.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  user_info: User | any;
  loading: boolean = true;
  show_empty: boolean = false;
  constructor(
    private router: Router,
    private localStorage: LocalService,
    public userservice: UserService,
    private modalService: NgbModal,
  ) {
    this.logs = [];
    try {
      this.user_info = this.userservice.getCurrentUser();
      if (!this.user_info || !this.user_info['token'] || this.user_info['role'] != 3) {
        this.localStorage.removeData('current_user');
        this.router.navigate(['/']);
      }
    }
    catch (e) {
    }
  }

  ngOnInit() {
    this.get_all_user();
  }

  get_all_user() {
    this.loading = true;
    this.userservice.get_all_logs(this.user_info['token'])
      .subscribe(
        data => {
          if (data) {
            this.logs = data;
            this.loading = false;
          } else {
            this.loading = false;
            this.show_empty = true;
          }
        });
  }
}
