import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy{

  // posts = [
  //   { title: "1st post", content: "This is 1st post content"},
  //   { title: "2nd post", content: "This is 2nd post content"},
  //   { title: "3rd post", content: "This is 3rd post content"},
  //   { title: "4th post", content: "This is 4th post content"}
  // ];

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public postService: PostsService){}

  ngOnInit(){
    this.posts = this.postService.getPosts();
    this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}