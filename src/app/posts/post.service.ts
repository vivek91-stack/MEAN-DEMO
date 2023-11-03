import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  getPosts() {
    this.httpClient.get<{message: string, posts: any}>('http://localhost:9500/api/posts')
      .pipe(map((postData)=>{
          return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            }
          })
      }))
      .subscribe((transformedPosts)=>{
        this.posts =  transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPosts(post : Post) {
    this.httpClient.post<{message: string, postId: string}>('http://localhost:9500/api/CreatePost', post)
    .subscribe((responseData)=>{
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    })
  }

  deletePost(id: string){
    this.httpClient.delete('http://localhost:9500/api/DeletePost/' + id).subscribe(()=>{
      const updatedPost = this.posts.filter(post => post.id !== id);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts])
    });
  }

  getPost(id: string) {
    return { ...this.posts.find(p => p.id === id) };
  }
}
