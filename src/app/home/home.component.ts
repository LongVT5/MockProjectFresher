import { Component, OnInit } from '@angular/core';
import { BlogappAPIService, Article, ArticleList, CommentList, TagList, Profile } from '../blogapp-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNumber: number[];
  clickedTag: boolean;
  tagName: string;
  typeList: string = 'global';
  currentPage : number = 1;

  constructor(private service: BlogappAPIService, private router: Router) {
    this.service.getTagList().subscribe((tag: TagList) => {  
     this.service.tags = tag; 
    });
    this.service.getArticleList().subscribe((data: ArticleList) => {
      this.service.articleList = data
      this.pageNumber =  new Array(this.service.articleList.articlesCount / 10 );
    });
  }

  ngOnInit() {
   
  }

  getDetail(slug) {
    this.service.getArticleDetail(slug).subscribe( (data: Article) => {
      this.service.articleDetail = data;
      this.router.navigate(['/article/' + slug]);
    });
  }

  showProfile(author) {
    this.service.getProfile(author).subscribe((info: Profile) => {
      this.service.authorInfo = info;
      this.router.navigate(['/profile/' + author]);
    });
    this.service.getArticleByAuthor(author).subscribe((articles: ArticleList) => { 
      this.service.articlesByAuthor = articles; 
    });
  }

  getFeedArticles() {
    this.typeList = 'feed';
    this.service.getFeedArticles().subscribe((list: ArticleList) => {
      this.service.articleList = list
      if (this.service.articleList.articlesCount < 10) {
        this.pageNumber = [];
      } else {
        this.pageNumber =  new Array(Math.ceil(this.service.articleList.articlesCount / 10 ));
      }
    });
  }

  getGlobalArticles() {
    this.typeList = 'global';
    this.clickedTag = false;
    this.service.getArticleList().subscribe((list: ArticleList) => {
      this.service.articleList = list
      this.pageNumber =  new Array(Math.ceil(this.service.articleList.articlesCount / 10 ));
    });
  }

  likeArticle(article) {
    if (this.service.token != null) {
      this.service.addToFavoritedArticle(article).subscribe((data) => { });
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadPage(index) {
    this.currentPage = index + 1;
    
    this.service.getArticlesByPage(index, this.typeList).subscribe((data: ArticleList) => {    
      this.service.articleList = data
    });
  }

  getArticlesByTag(tag) {
    this.typeList ='';
    this.clickedTag = true;
    this.tagName = tag;
    this.service.getArticlesByTag(tag).subscribe((data: ArticleList) => { 
      this.service.articleList = data 
    });
  }
}
