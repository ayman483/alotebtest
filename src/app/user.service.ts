import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalService } from './local.service';
import { User,Order, Log } from './_models/user';
import { config } from './config';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalService
  ) { }

  getAll(token: any) {
    var postData: any = new FormData();
    postData.append('token', token);
    return this.http.post<User[]>(`${config.API_url}user/get_all`, postData);
  }

  login(email: any, pwd: any) {
    var postData: any = new FormData();
    postData.append('email', email);
    postData.append('pwd', pwd);
    return this.http.post(`${config.API_url}user/login`, postData);
  }

  add_or_update(param: any,token:any) {
    var postData: any = new FormData();
    postData.append('email', param['email']);
    postData.append('first_name', param['first_name']);
    postData.append('last_name', param['last_name']);
    postData.append('role', param['role']);
    postData.append('password', param['password']);
    postData.append('id', param['id']);
    postData.append('token', token);
    return this.http.post(`${config.API_url}user/add_user`, postData);
  }

  delete(id: number) {
    return this.http.delete(`${config.API_url}user/remove_user/${id}`);
  }

  getCurrentUser() {
    let curUser;
    try {
      curUser = JSON.parse(this.localStorage.getItem("current_user"));
    }
    catch (e) {
      console.log(e)
    }
    return curUser
  }

  //  order section

  get_all_order(token: any) {
    var postData: any = new FormData();
    postData.append('token', token);
    return this.http.post<Order[]>(`${config.API_url}orders/get_all`, postData);
  }

  update_status_order(id: any,status:any,token: any) {
    var postData: any = new FormData();
    postData.append('id', id);
    postData.append('status', status);
    postData.append('token', token);
    return this.http.post(`${config.API_url}orders/update_status`, postData);
  }

  get_all_logs(token: any) {
    var postData: any = new FormData();
    postData.append('token', token);
    return this.http.post<Log[]>(`${config.API_url}logs/get_all`, postData);
  }

}
