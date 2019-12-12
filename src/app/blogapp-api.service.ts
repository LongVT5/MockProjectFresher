import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleList {
  articles: Article[];
  articlesCount: number;
}

export interface Article {
  article: {
    author: {
      bio: string;
      following: boolean;
      image: string;
      username: string;
    }
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
  }
}

export interface TagList {
  tags: string[];
}

export interface CommentList {
  comments: string[];
}

export interface Profile {
  profile: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  }
}

export interface User {
  user: {
    bio: string,
    createAt: string,
    email: string,
    id: number,
    image: string,
    token: string,
    updatedAt: string,
    username: string
  }
}
@Injectable({
  providedIn: 'root'
})

export class BlogappAPIService {
  url: string = "https://conduit.productionready.io/api";
  
  articleList: ArticleList;
  tags: TagList;
  articleDetail: Article;
  comments: CommentList;
  authorInfo: Profile;
  articlesByAuthor: ArticleList;
  user: string = localStorage.getItem("currentName");
  token: string = localStorage.getItem("jwt") ;
  
  updateCurrentUser() {
    this.user = localStorage.getItem("currentName");
  }

  isLoggin() {
    this.token = localStorage.getItem("jwt");
    this.user = localStorage.getItem("currentName");
  }

  constructor(private httpClient: HttpClient) { }

  getTagList() : Observable<Object> {
    return this.httpClient.get(this.url + "/tags");
  }

  getArticleList() : Observable<Object> { 
    if (this.token != null) {
      return this.httpClient.get(this.url + "/articles",
        {
          headers: { Authorization: 'Token ' + this.token },
          params: {
            limit: "10"
          }
        }
      );
    } else {
      return this.httpClient.get(this.url + "/articles",
        {
          params: {
            limit: "10"
          }
        }
      );
    }
  }

  registerUser(user) : Observable<Object> {
    return this.httpClient.post(this.url + "/users", {
      "user": {
        "username": user.name,
        "email": user.email,
        "password": user.password
      }
    }
    );
  }

  getArticleDetail(slug) : Observable<Object> {
    if (this.token != null) {
      return this.httpClient.get(this.url + "/articles/" + slug , { headers: { Authorization: 'Token ' + this.token } }
      );
    } else {
      return this.httpClient.get(this.url + "/articles/" + slug);
    }
  }

  getComments(slug) : Observable<Object> {
    return this.httpClient.get(this.url + "/articles/" + slug + "/comments");
  }

  getProfile(author) : Observable<Object>{
    if (this.token != null) {
      return this.httpClient.get(this.url + "/profiles/" + author , { headers: { Authorization: 'Token ' + this.token } }
      );
    } else {
      return this.httpClient.get(this.url + "/profiles/" + author);
    }
  }

  getArticleByAuthor(authorName) : Observable<Object> {
    return this.httpClient.get(this.url + "/articles",
      {
        params: {
          author: authorName,
          limit: '10'
        }
      },
    );
  }

  logIn(user) : Observable<Object>{
    return this.httpClient.post(this.url + "/users/login", {
      "user": {
        "email": user.email,
        "password": user.password
      }
    });
  }

  createArticle(article) : Observable<Object>{
    return this.httpClient.post(this.url + "/articles", {
      "article": {
        "title": article.title,
        "description": article.description,
        "body": article.body,
        "tagList": article.tag
      },
    }, { headers: { Authorization: 'Token ' + this.token } }
    );
  }

  getCurrentUser() : Observable<Object>{
    return this.httpClient.get(this.url + '/user', { headers: { Authorization: 'Token ' + this.token } }
    );
  }

  updateUserProfile(user) : Observable<Object>{
    return this.httpClient.put(this.url + '/user',
      {
        "user": {
          "username": user.name,
          "bio": user.bio,
          "image": user.image
        }
      }, { headers: { Authorization: 'Token ' + this.token } }
      );
  }

  deleteArticle(slug) : Observable<Object>{
    return this.httpClient.delete(this.url + '/articles/' + slug, { headers: { Authorization: 'Token ' + this.token } }
    );
  }

  createComment(slug, comment) : Observable<Object>{
    return this.httpClient.post(this.url + "/articles/" + slug + "/comments", {
      "comment": {
        "body": comment.content
      }
    }, { headers: { Authorization: 'Token ' + this.token } }
     );
  }

  deleteComment(slug, id) : Observable<Object>{
    return this.httpClient.delete(this.url + "/articles/" + slug + "/comments/" + id, { headers: { Authorization: 'Token ' + this.token } }
    );
  }

  getFeedArticles() : Observable<Object>{
    return this.httpClient.get(this.url + "/articles/feed",  
      {
        headers: { Authorization: 'Token ' + this.token },
        params: {
          limit: '10'
        }
      }
    );
  }

  getFavoritedArticles(userName) : Observable<Object>{
    if (this.token != null) {
      return this.httpClient.get(this.url + "/articles",
        {
          headers: { Authorization: 'Token ' + this.token },
          params: {
            favorited: userName,
            limit: '10'
          }
        });
    } else {
      return this.httpClient.get(this.url + "/articles",
        {
          params: {
            favorited: userName,
            limit: '10'
          }
        });
    }
  }

  logOut() {
    localStorage.clear();
  }

  addToFavoritedArticle(article) : Observable<Object>{
    return this.httpClient.post(this.url + "/articles/" + article.slug + "/favorite", {}, { headers: { Authorization: 'Token ' + this.token } }
      );
  }

  deleteFavoritedArticle(article) : Observable<Object>{
    return this.httpClient.delete(this.url + "/articles/" + article.slug + "/favorite", { headers: { Authorization: 'Token ' + this.token } }
      );
  }

  followUser(user) : Observable<Object>{
    return this.httpClient.post(this.url + "/profiles/" + user + "/follow", {}, { headers: { Authorization: 'Token ' + this.token } }
      );
  }

  unfollowUser(user) : Observable<Object>{
    return this.httpClient.delete(this.url + "/profiles/" + user + "/follow", { headers: { Authorization: 'Token ' + this.token } }
      );
  }

  editArticle(slug, article) : Observable<Object>{
    return this.httpClient.put(this.url + '/articles/' + slug,
      {
        "article": {
          "title": article.title,
          "description": article.description,
          "body": article.body,
          "tagList": article.tag
        }
      }, { headers: { Authorization: 'Token ' + this.token } }
    )
  }

  getArticlesByPage(index, type) : Observable<Object>{
    let skipNum = index * 10;
    if (this.token != null) {
      if (type == 'global') {
        return this.httpClient.get(this.url + "/articles",
          {
            headers: { Authorization: 'Token ' + this.token },
            params: {
              limit: "10",
              offset: skipNum.toString()
            }
          }
        );
      } else {
        return this.httpClient.get(this.url + "/articles/feed",
          {
            headers: { Authorization: 'Token ' + this.token },
            params: {
              limit: "10",
              offset: skipNum.toString()
            }
          }
        );
      }
    } else {
      return this.httpClient.get(this.url + "/articles",
        {
          params: {
            limit: "10",
            offset: skipNum.toString()
          }
        }
      );
    }
  }

  getArticlesByTag(tag) : Observable<Object>{
    return this.httpClient.get(this.url + "/articles",
      {
        params: {
          tag: tag,
          limit: "10"
        }
      })
  }

  getPageArticlesByParam(index, author, type): Observable<Object> {
    let skipNum = index * 10;
    if (type == 'favorited') {
      if(this.token != null){
        return this.httpClient.get(this.url + "/articles",
        {
          headers: { Authorization: 'Token ' + this.token },
          params: {
            favorited: author,
            limit: "10",
            offset: skipNum.toString()
          }
        });
      } else {
        return this.httpClient.get(this.url + "/articles",
        {
          params: {
            favorited: author,
            limit: "10",
            offset: skipNum.toString()
          }
        });
      }    
    } else {
      return this.httpClient.get(this.url + "/articles",
        {
          params: {
            author: author,
            limit: "10",
            offset: skipNum.toString()
          }
        });
    }
  }
}
