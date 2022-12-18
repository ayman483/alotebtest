import { Component, OnInit } from '@angular/core';
import { User } from './../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { LocalService } from '../local.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  user_info: User | any;
  loading: boolean = true;
  show_empty: boolean = false;
  constructor(
    private router: Router,
    private localStorage: LocalService,
    public userservice: UserService,
    private modalService: NgbModal,
  ) {
    this.users = [];
    try {
      this.user_info = this.userservice.getCurrentUser();
      if (!this.user_info || !this.user_info['token']) {
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
    this.userservice.getAll(this.user_info['token'])
      .subscribe(
        data => {
          if (data) {
            this.users = data;
            this.loading = false;
          } else {
            this.loading = false;
            this.show_empty = true;
          }
        });
  }

  delete(id: number) {
    this.userservice.delete(id)
      .subscribe(
        data => {
          if (data) {
            this.get_all_user();
          }
        }
      );
  }

  async edit(user: User) {
    var itemModal = this.modalService.open(AddUserComponent, { windowClass: 'itemPopupModal', size: 'lg', centered: true, backdrop: true });
    itemModal.componentInstance.user = user;
    return await itemModal.result.then((result) => {
      if (result) {
        this.get_all_user();
      }
      return result;
    }, (reason) => {
      return false;
    });
  }

  async add_new() {
    var itemModal = this.modalService.open(AddUserComponent, { windowClass: 'itemPopupModal', size: 'lg', centered: true, backdrop: true });
    return await itemModal.result.then((result) => {
      if (result) {
        this.get_all_user();
      }
      return result;
    }, (reason) => {
      return false;
    });
  }
}
