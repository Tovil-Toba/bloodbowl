import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

import { Skill } from '../shared/skill';
import { SkillModel } from '../shared/skill.model';
import { SkillsService } from '../shared/skills.service';
import { SkillCategoryModel } from '../shared/skill-category.model';
import { SKILL_CATEGORIES } from '../shared/skill-categories';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {

  @Input() skill?: SkillModel;
  @Output() submittedSkill = new EventEmitter<SkillModel>();

  clonedSkill: SkillModel;
  skillCategories: SkillCategoryModel[] = SKILL_CATEGORIES;
  loading = false;
  submitLoading = false;

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    const newSkill = new Skill(this.skillCategories[0].name);
    const skill = this.skill.id ? this.skill : newSkill;
    this.clonedSkill = _.clone(skill);
  }

  onSubmit() {
    this.submitLoading = true;
    if (!this.clonedSkill.id) {
      this.skillsService.addItem(this.clonedSkill)
        .subscribe((skill: SkillModel) => {
          this.submittedSkill.emit(skill);
          this.clonedSkill = _.clone(skill);
          this.submitLoading = false;
        });
    } else {
      this.skillsService.updateItem(this.clonedSkill)
        .subscribe(() => {
          this.submittedSkill.emit(this.clonedSkill);
          this.clonedSkill = _.clone(this.clonedSkill);
          this.submitLoading = false;
        });
    }
  }
}