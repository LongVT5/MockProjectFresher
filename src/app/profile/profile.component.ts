import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, Article, CommentList, ArticleList, Profile } from '../blogapp-api.service';
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
  pageNumber: number[];
  type: string ='';
  constructor(private service: BlogappAPIService, private router: Router) {
    if(this.service.articlesByAuthor!= null){
      this.pageNumber = ([...Array(Math.ceil(this.service.articlesByAuthor.articlesCount / 10) + 1).keys()]).slice(1);
      console.log(this.pageNumber);

    }
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
    this.type = 'favorited';
    this.service.getFavoritedArticles(userName).subscribe( (data :ArticleList) => { this.service.articlesByAuthor = data
      if(this.service.articlesByAuthor.articlesCount <= 10){
        this.pageNumber = [];
      } else {
        this.pageNumber = ([...Array(Math.ceil(this.service.articlesByAuthor.articlesCount / 10) + 1).keys()]).slice(1);
      } 
    this.active= false} );
  }

  getMyArticles(authorName){
    this.type = '';
    this.service.getArticleByAuthor(authorName).subscribe( (data : ArticleList) => { this.service.articlesByAuthor = data
      if(this.service.articlesByAuthor.articlesCount <= 10){
        this.pageNumber = [];
      } else {
        this.pageNumber = ([...Array(Math.ceil(this.service.articlesByAuthor.articlesCount / 10) + 1).keys()]).slice(1);
      }
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

  loadPage(index, author){
    this.service.getPageArticlesByParam(index, author, this.type).subscribe( (data: ArticleList) => {this.service.articlesByAuthor = data
    console.log(data) });
  }

  showProfile(author){
    this.service.getProfile(author).subscribe( (info :Profile) => { this.service.authorInfo = info ; 
      this.router.navigate(['/profile']);
      //console.log(info)
    });
  }
}
