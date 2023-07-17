import { MessagesService } from './../../../services/messages.service';

import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';


import { MomentService } from 'src/app/services/moment.service';

import { Moment } from 'src/app/Moment';

import { environment } from 'src/environments/environment';
import { Interpolation } from '@angular/compiler';

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

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
    ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data));
  }
  getMoment(id: number) {
    throw new Error('Method not implemented.');
  }

   async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Excluido com sucesso!");

    this.router.navigate(['/']);
  }
}

