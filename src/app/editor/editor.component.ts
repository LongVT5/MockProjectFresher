import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BlogappAPIService } from '../blogapp-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  f: FormGroup;
  url;
  article;
  tagList: string[] = [];
  constructor(private fb: FormBuilder, private service: BlogappAPIService, private router: Router, private ar: ActivatedRoute) {
    this.f = fb.group({
      title: [],
      description: [],
      body: [],
      tag: []
    })
    ar.params.subscribe((data) => this.url = data);
  }

  ngOnInit() {
    if (this.url.slug != null) {
      this.service.getArticleDetail(this.url.slug).subscribe((data) => {
        if (this.url.slug != null) {
          this.f.patchValue({
            title: [data['article'].title],
            description: [data['article'].description],
            body: [data['article'].body],
            tag: []
          });
        }
        this.tagList = data['article'].tagList;
       });
    }
  }

  addTagToList(event: Event) {
    this.tagList.push(event.target['value']);
  }

  createArticle() {
    let article = {
      title: this.f.controls.title.value,
      description: this.f.controls.description.value,
      body: this.f.controls.body.value,
      tag: this.tagList
    }
    this.service.createArticle(article).subscribe((data) => {  });
    this.router.navigate(["/"]);
  }

  editArticle(slug) {
    let article = {
      title: this.f.controls.title.value,
      description: this.f.controls.description.value,
      body: this.f.controls.body.value,
      tag: this.tagList
    }
    this.service.editArticle(slug, article).subscribe((data) => { });
    this.router.navigate(["/"]);
  }

  deleteTag(index){
    this.tagList.splice(index, 1);
  }
}
