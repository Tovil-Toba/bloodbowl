import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillCategoriesComponent } from './skill-categories/skill-categories.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  { path: 'skill-categories', component: SkillCategoriesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'skills/:id', component: SkillsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
