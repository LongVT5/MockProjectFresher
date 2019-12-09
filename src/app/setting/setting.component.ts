import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, User } from '../blogapp-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  err: Object;
  f: FormGroup;
  constructor(private service: BlogappAPIService, private fb: FormBuilder, private router: Router) {
    let info: User;
    this.f = fb.group({
      image: [],
      name: [ , [Validators.required]],
      bio: [],
      email: [],
      password: []
    })
    service.getCurrentUser().subscribe((data: User) => {
      info = data;
      this.f.patchValue({
        image: [info.user.image],
        name: [info.user.username],
        bio: [info.user.bio],
        email: [info.user.email],
        password: []
      })
    })

  }

  ngOnInit() {
  }

  updateUser() {
    let userInfo = {
      image: this.f.controls.image.value,
      name: this.f.controls.name.value,
      bio: this.f.controls.bio.value,
      email: this.f.controls.email.value,
      password: this.f.controls.password.value

    }
    
    this.service.updateUserProfile(userInfo).subscribe((data) => {
      localStorage.setItem("currentName",userInfo.name) ;
      this.service.updateCurrentUser();
      this.router.navigate(['/']);
    },
      err => { this.err = err;  });
  }

  logOut() {
    this.service.logOut();
    this.service.isLoggin();
    this.router.navigate(['/']);
  }
}
