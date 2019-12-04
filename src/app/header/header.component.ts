import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, ArticleList } from '../blogapp-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private service :BlogappAPIService) { }

  ngOnInit() {
    
  }

  getArticleList(){
    this.service.getArticleList().subscribe((data : ArticleList) => { this.service.articleList = data 
    //console.log(data)
    });
  }

  getUser(){
    this.service.getCurrentUser().subscribe( (data) => {
      let currentUser = { 
        profile :{
          username: data['user'].username,
          bio: data['user'].bio,
          image: data['user'].image,
          following: true
        }
      };
      this.service.authorInfo = currentUser;
      //console.log(data);
      this.service.getArticleByAuthor(this.service.authorInfo.profile.username).subscribe( (articles : ArticleList) => { this.service.articlesByAuthor = articles});
    });
  }
}
