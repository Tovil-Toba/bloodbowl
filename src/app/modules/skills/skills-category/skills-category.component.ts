import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { Skill } from '../shared/skill';
import { SkillModel } from '../shared/skill.model';
import { SkillCategoryModel } from '../shared/skill-category.model';
import { SkillsService } from '../shared/skills.service';
import { SKILL_CATEGORIES } from '../shared/skill-categories';

@Component({
  selector: 'app-skills-category',
  templateUrl: './skills-category.component.html',
  styleUrls: ['./skills-category.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class SkillsCategoryComponent implements DoCheck {

  breadcrumbItems: MenuItem[] = [];
  skill: SkillModel;
  skillFormDialog = false;
  skillCategories: SkillCategoryModel[] = SKILL_CATEGORIES;
  skillCategory: SkillCategoryModel;
  skillsByCategories: Record<string, SkillModel[]> = {};
  oldSkills: SkillModel[];
  oldUrlId: string;
  tabIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public skillsService: SkillsService,
  ) { }

  deleteSkill(skill: SkillModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete skill "${skill.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.skillsService.deleteSkill(skill);
      }
    });
  }

  editSkill(skill: SkillModel): void {
    this.skill = skill;
    this.skillFormDialog = true;
  }

  ngDoCheck(): void {
    if (this.skillsService.skills.length && this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getBreadcrumbItems(this.urlId);
      this.tabIndex = _.findIndex(this.skillCategories, { urlId: this.urlId });
    }

    if (!_.isEqual(this.skillsService.skills, this.oldSkills)) {
      this.oldSkills = _.clone(this.skillsService.skills);
      this.getSkillsByCategories();
    }
  }

  onSkillFormSubmit(skill: SkillModel): void {
    this.skillFormDialog = false;
    this.tabIndex = _.findIndex(this.skillCategories, { name: skill.category });
  }

  onTabChange(event: { originalEvent: MouseEvent, index: number }): void {
    try {
      const skillCategory = this.skillCategories[event.index];
      window.history.pushState('', '', `/skills/${skillCategory.urlId}`);
      this.getBreadcrumbItems(skillCategory.urlId);
    } catch (e) {
      console.error(e);
    }
  }

  openNewSkillDialog(): void {
    this.skill = new Skill();
    this.skillFormDialog = true;
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  private getBreadcrumbItems(urlId: string): void {
    this.skillCategory = _.find<SkillCategoryModel>(SKILL_CATEGORIES, { urlId });
    this.breadcrumbItems = [
      { label: 'Skills', routerLink: '/skills' },
      { label: this.skillCategory.name }
    ];
  }

  private getSkillsByCategories(): void {
    try {
      this.skillCategories.forEach((skillCategory: SkillCategoryModel) => {
        this.skillsByCategories[skillCategory.urlId] = _.sortBy(
          _.filter(
            this.skillsService.skills,
            { category: skillCategory.name }
          ),
          ['name']
        );
      });
    } catch (e) {
      console.error(e);
    }
  }

}
