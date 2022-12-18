import { Component, OnInit } from '@angular/core';
import { User, Order } from './../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { LocalService } from '../local.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  user_info: User | any;
  loading: boolean = true;
  show_empty: boolean = false;
  constructor(
    private router: Router,
    private localStorage: LocalService,
    public userservice: UserService,
    private modalService: NgbModal,
  ) {
    this.orders = [];
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
    this.userservice.get_all_order(this.user_info['token'])
      .subscribe(
        data => {
          if (data) {
            this.orders = data;
            this.loading = false;
          } else {
            this.loading = false;
            this.show_empty = true;
          }
        });
  }

  accept(id: number) {
    this.userservice.update_status_order(id,2,this.user_info['token'])
      .subscribe(
        data => {
          if (data) {
            this.get_all_user();
          }
        }
      );
  }

  cancel(id: number) {
    this.userservice.update_status_order(id,3,this.user_info['token'])
      .subscribe(
        data => {
          if (data) {
            this.get_all_user();
          }
        }
      );
  }

  async edit(user: User) {
    console.log(user);
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
