import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Crud } from '../../../core/crud';
import { SkillModel } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends Crud<SkillModel> {

  loading = false;
  skills: SkillModel[] = [];

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/skills', http, messageService);
  }

  getSkillByName(name: string): SkillModel {
    const nameMask = name.split('(')[0].trim().toLowerCase();
    return _.find<SkillModel>(this.skills, (skill: SkillModel) => {
      return _.startsWith(skill.name.toLowerCase(), nameMask);
    });
  }

  deleteSkill(skill: SkillModel): void {
    this.deleteItem(skill.id).subscribe(() => {
      this.skills = _.clone(this.skills.filter(val => val.id !== skill.id));
    });
  }

  onSkillFormSubmit(skill: SkillModel): void {
    const index = _.findIndex(this.skills, { id: skill.id });
    if (index === -1) {
      const clonedSkills = _.clone(this.skills);
      clonedSkills.push(skill);
      this.skills = clonedSkills;
    } else {
      this.skills.splice(index, 1, skill);
    }
  }

}
