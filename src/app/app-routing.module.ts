import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
import { EditorComponent } from './editor/editor.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile/:author', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'article/:slug', component: ArticleComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'setting', component: SettingComponent , canActivate : [LoginGuard]},
  { path: 'editor', component: EditorComponent , canActivate : [LoginGuard]},
  { path: 'editor/:slug', component: EditorComponent, canActivate : [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
