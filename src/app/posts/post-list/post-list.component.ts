import { PostService } from './../post.service';
import { Component } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
 posts:Post[] = [];
 private postSubscription: Subscription;

  constructor(public postService : PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener().subscribe((posts: Post[])=>{
        this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  deletePost(id: string){
    this.postService.deletePost(id);
  }
}
