import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { Crud } from '../../../core/crud';
import { SkillModel } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends Crud<SkillModel> {

  skills: SkillModel[] = [];
  loading = false;

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/skills', http, messageService);
  }
}
