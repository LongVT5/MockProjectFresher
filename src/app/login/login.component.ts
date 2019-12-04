import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogappAPIService } from '../blogapp-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  f: FormGroup

  constructor(private fb:FormBuilder, private service: BlogappAPIService, private router: Router) {
    this.f = fb.group({
      email:[],
      password:[]
    })
   }

  ngOnInit() {
  }

  logIn(){
    let user = {
      email: this.f.controls.email.value,
      password: this.f.controls.password.value
    }

    this.service.logIn(user).subscribe((data)=>{
      localStorage.setItem("jwt",data['user'].token);
      localStorage.setItem("currentName",data['user'].username);
      this.service.isLoggin();
    //console.log(localStorage.getItem("currentName"));
    //console.log(data);
      //this.service.user = localStorage.getItem("currentName");
      this.router.navigate(["/"]);
    });
    
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
