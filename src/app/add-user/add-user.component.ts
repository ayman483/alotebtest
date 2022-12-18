
import { User } from './../_models/user';
import { UserService } from '../user.service'

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddUserComponent implements OnInit {
  @Input() user: User;
  click_save: boolean = false;
  new_User: FormGroup;
  // item: User;
  langStyle: any;
  user_info: User | any;
  constructor(
    // public app_ser: AppService,
    public activeModal: NgbActiveModal,
    // private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public userService: UserService,
  ) {
    this.user_info = this.userService.getCurrentUser();
    console.log(this.user)
    if(!this.user){
      this.user = new User;
    }
  }
  ngOnInit() {
    this.new_User = this.formBuilder.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': [''],
      'role': ['', Validators.required]
    });
  }


  get fval() {
    return this.new_User.controls;
  }

  checked({ value, valid }: { valid: any, value: any }) {
    if (!valid || !this.new_User)
      return false;
    return true;
  }

  validateAllFileds(form:any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  save() {
    if (this.new_User.invalid) {
      this.validateAllFileds(this.new_User)
      this.click_save = true;
      return;
    }
    this.user.first_name = this.new_User.value.first_name;
    this.user.last_name = this.new_User.value.last_name;
    this.user.email = this.new_User.value.email;
    this.user.password = this.new_User.value.password;
    this.user.role = this.new_User.value.role;

    if (!this.user.id) {
      this.user.id = 0;
    }
    this.userService.add_or_update(this.user ,this.user_info['token']).subscribe(
      data => {
        if (!this.user.id) {
          // this.toastr.success(this.translate.instant('added succesfully'), this.translate.instant('Cool!'));
        }
        else {
          // this.toastr.success(this.translate.instant('edit succesfully'), this.translate.instant('Cool!'));
        }
        this.activeModal.close(this.user);
      });
  }

}
