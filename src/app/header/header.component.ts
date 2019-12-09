import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, ArticleList } from '../blogapp-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: BlogappAPIService, private router: Router) { }

  ngOnInit() {

  }

  getArticleList() {
    this.service.getArticleList().subscribe((data: ArticleList) => {
      this.service.articleList = data
    });
  }

  getUser() {
    this.service.getCurrentUser().subscribe((data) => {
      let currentUser = {
        profile: {
          username: data['user'].username,
          bio: data['user'].bio,
          image: data['user'].image,
          following: true
        }
      };
      this.service.authorInfo = currentUser;
      this.service.getArticleByAuthor(this.service.authorInfo.profile.username).subscribe((articles: ArticleList) => {
        this.service.articlesByAuthor = articles
        this.router.navigate(['/profile/']);
      });
    });
  }
}
