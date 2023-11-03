import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from './../post.service';
import { Post } from "../post.model";

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css'],
})

export class PostCreateComponent {

  post : Post;
  private mode = 'create';
  private id : string;

  constructor(
    public postService : PostService,
    public route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.postService.getPost(this.id);
      } else{
        this.mode = 'create';
        this.id = null;
      }
    })

  }

  addPost(form: NgForm){
    if(form.invalid) return;

    const post: Post = {
      id: null,
      title : form.value.postTitle,
      content : form.value.postContent,
    }
    this.postService.addPosts(post);
    form.resetForm();
  }
}
