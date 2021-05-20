import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { SkillsService } from '../shared/skills.service';
import { SkillCategoryModel } from '../shared/skill-category.model';
import { SkillModel } from '../shared/skill.model';
import { SKILL_CATEGORIES } from '../shared/skill-categories';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-skills-category',
  templateUrl: './skills-category.component.html',
  styleUrls: ['./skills-category.component.css'],
  animations: [enterPageAnimation]
})
export class SkillsCategoryComponent implements OnInit, DoCheck {

  skillCategories: SkillCategoryModel[] = SKILL_CATEGORIES;
  skillCategory: SkillCategoryModel;
  skillsByCategories: Record<string, SkillModel[]> = {};
  oldUrlId: string;
  breadcrumbItems: MenuItem[];
  tabIndex = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public skillsService: SkillsService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  getBreadcrumbItems(urlId: string): void {
    this.skillCategory = _.find<SkillCategoryModel>(SKILL_CATEGORIES, { urlId });
    this.breadcrumbItems = [
      { label: 'Skills', routerLink: '/skills' },
      { label: this.skillCategory.name }
    ];
  }

  getSkillsByCategories(): void {
    try {
      this.skillCategories.forEach((skillCategory: SkillCategoryModel) => {
        this.skillsByCategories[skillCategory.urlId] = _.filter(this.skillsService.skills, {category: skillCategory.name});
      });
    } catch (e) {
      console.error(e);
    }
  }

  ngDoCheck(): void {
    if (this.skillsService.skills.length && this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getBreadcrumbItems(this.urlId);
      this.tabIndex = _.findIndex(this.skillCategories, { urlId: this.urlId });
    }
  }

  ngOnInit(): void {
    this.getSkillsByCategories();
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

}
