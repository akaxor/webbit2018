import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {AppService} from '../app.service';
import { Post } from '../appClasses';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  post: Post;
  author: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appService: AppService
  ) { }

  ngOnInit() {
    // Hämtar inläggs-ID från adressfält
    let _id = this.route.snapshot.paramMap.get('_id');

    // Hämtar specifikt inlägg/kommentar som matchar ID:t
    this.appService.getPost(_id)
    .subscribe(data => this.post=data);
  }

  // Hämtar data för att uppdatera inlägg/kommentar
  updatePost(_id){
    let payload = {
      id: this.post._id,
      title: this.post.title,
      content: this.post.content
    }
    this.appService.updatePost(payload);
    // Uppdaterar vy och skickar användaren tillbaka till op-sidan
    window.location.reload();
    this.router.navigate(['post/' + _id]);
  }

  // Hämtar data för att radera inlägg/kommentar
  deletePost(_id){
    let payload = {
      id: this.post._id,
      title: this.post.title, 
      content: this.post.content
    }
    this.appService.deletePost(payload);
    // Skickar användaren automatiskt till startsidan
    this.router.navigate(['/']);
  }

  // "Cancel"-knapp skickar användaren tillbaka till föregående vy
  goBack(){
    this.location.back();
  }

}
