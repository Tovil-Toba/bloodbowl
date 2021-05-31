import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { Skill } from '../shared/skill';
import { SkillModel } from '../shared/skill.model';
import { SkillsService } from '../shared/skills.service';

import { SKILL_CATEGORIES } from '../shared/skill-categories';
import { SkillCategoryModel } from '../shared/skill-category.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ],
  animations: [enterPageAnimation]
})
export class SkillsComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  loading = false;
  skill: SkillModel;
  skills: SkillModel[] = [];
  skillCategories: SkillCategoryModel[] = SKILL_CATEGORIES;
  skillFormDialog = false;

  constructor(
    private confirmationService: ConfirmationService,
    public skillsService: SkillsService
  ) { }

  editSkill(skill: SkillModel): void {
    this.skill = skill;
    this.skillFormDialog = true;
  }

  deleteSkill(skill: SkillModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete skill "${skill.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.skillsService.deleteItem(skill.id).subscribe(() => {
          this.skillsService.skills = this.skillsService.skills.filter(val => val.id !== skill.id);
        });
      }
    });
  }

  onSkillFormSubmit(skill: SkillModel): void {
    const index = _.findIndex(this.skillsService.skills, { id: skill.id });
    this.skillFormDialog = false;
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Skills' }
    ];
  }

  openNewSkillDialog(): void {
    this.skill = new Skill();
    this.skillFormDialog = true;
  }

}
