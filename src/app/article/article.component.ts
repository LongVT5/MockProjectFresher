import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, Profile, ArticleList, CommentList } from '../blogapp-api.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  token = localStorage.getItem("jwt");
  f : FormGroup;
  constructor(private service : BlogappAPIService, private router: Router, private fb: FormBuilder) { 
    this.f = fb.group({
      comment: []
    });

    //console.log(this.service.articleDetail.article.slug);
    if(this.service.articleDetail != null){
      this.service.getComments(this.service.articleDetail.article.slug).subscribe( (comments : CommentList) => {  this.service.comments = comments; console.log(comments) });

    }
  }
      
  ngOnInit() {
  }

  navigateToForm(slug){
    this.router.navigate(["/editor/"+slug]);
  }

  deleteArticle(slug){
    this.service.deleteArticle(slug).subscribe( (data) => {  });
    this.router.navigate(['/']);
  }

  createComment(slug){
    let comment = {
      content : this.f.controls.comment.value
    }
    this.service.createComment(slug, comment).subscribe( (data) => {  console.log(data)
      this.service.getComments(this.service.articleDetail.article.slug).subscribe( (comments : CommentList) => {  this.service.comments = comments; console.log(comments) });
    });
    
  }

  deleteComment(slug, id){
    this.service.deleteComment(slug, id).subscribe( (data) => {  });
  }

  followUser(username){
    if(this.service.token != null){
      this.service.followUser(username).subscribe( (data) => {  });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addToFavorite(slug){
    if(this.service.token != null){
      this.service.addToFavoritedArticle(slug).subscribe( (data) => {  });
    } else {
      this.router.navigate(['/login']);
    }
   
  }

  showProfile(authorname){
    this.service.getProfile(authorname).subscribe( (info :Profile) => { this.service.authorInfo = info ; 
      this.router.navigate(['/profile']);
      //console.log(info)
    });
    
    this.service.getArticleByAuthor(authorname).subscribe( (articles : ArticleList) => { this.service.articlesByAuthor = articles; console.log(articles)});
  }
}
