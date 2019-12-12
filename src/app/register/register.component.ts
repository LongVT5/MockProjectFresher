import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlogappAPIService } from '../blogapp-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  f: FormGroup;
  err: Object;
  constructor(private fb: FormBuilder , private service: BlogappAPIService, private router: Router) {
    this.f = fb.group({
      name: [],
      email: [],
      password: []
    })
  }

  ngOnInit() {
  }

  submit() {
    let user = {
      name: this.f.controls.name.value,
      email: this.f.controls.email.value,
      password: this.f.controls.password.value
    };
    
    this.service.registerUser(user).subscribe( (data)=> { this.router.navigate(['/login'])},
    err => { this.err = err });
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
