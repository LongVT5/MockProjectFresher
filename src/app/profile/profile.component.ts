import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, Article, CommentList, ArticleList } from '../blogapp-api.service';
import { Router } from '@angular/router';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  follow: boolean ;
  active: boolean = true;
  constructor(private service: BlogappAPIService, private router: Router) {
    
   }

  ngOnInit() {
    if(this.service.authorInfo){
      this.follow = this.service.authorInfo.profile.following;
    }
  }

  navigateToSetting(){
    this.router.navigate(["/setting"]);
  }

  showDetail(slug) {
    this.service.getArticleDetail(slug).subscribe( (a : Article) => {  this.service.articleDetail = a; console.log(a)});
    
    this.service.getComments(slug).subscribe( (comments : CommentList) => { 
      this.service.comments = comments ;
      this.router.navigate(["/article"])
    });
  }

  getFavoritedArticles(userName){
    this.service.getFavoritedArticles(userName).subscribe( (data :ArticleList) => { this.service.articlesByAuthor = data 
    this.active= false} );
  }

  getMyArticles(authorName){
    this.service.getArticleByAuthor(authorName).subscribe( (data : ArticleList) => { this.service.articlesByAuthor = data
    this.active= true});
  }

  followUser(user){
    if(this.service.token != null){
      this.service.followUser(user).subscribe( (data) => { });
      this.follow = true;
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  unfollowUser(user){
    let ad;
    this.service.unfollowUser(user).subscribe( (data) => {  });
    this.follow = false;
  }

  checkFavorited(article){
    //console.log(article.favorited);
    let ad;
    if(article.favorited == false){
      this.service.addToFavoritedArticle(article).subscribe( (data) => ad = data);
    } else {
      this.service.deleteFavoritedArticle(article).subscribe( (data) => ad = data);
    }
  }
}
