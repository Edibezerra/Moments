import { Comment } from 'src/app/comment';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MessagesService } from './../../../services/messages.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

import { MomentService } from 'src/app/services/moment.service';

import { Moment } from 'src/app/Moment';

import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent  implements OnInit{
  moment? :Moment;
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes;
  faEdit = faEdit;

  commentform!: FormGroup

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
    ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));

    this.commentform = new FormGroup({
      text: new FormControl ("", [Validators.required]),
      username: new FormControl ("", [Validators.required])
    });
  }

  get text (){
    return this.commentform.get('text')!;
  }
  get username (){
    return this.commentform.get('username')!;
  }

  getMoment(id: number) {
    throw new Error('Method not implemented.');
  }

   async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Excluido com sucesso!");

    this.router.navigate(['/']);
  }

 async onSubmit( FormDirective: FormGroupDirective){

    if(this.commentform.invalid){
      return
    }
    const data: Comment = this.commentform.value

    data.momentId = String(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add("Commentário adicionado!");

    this.commentform.reset();

    FormDirective.resetForm();

  }
}

