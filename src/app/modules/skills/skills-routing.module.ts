import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsComponent } from './skills/skills.component';
import { SkillsCategoryComponent } from './skills-category/skills-category.component';

const routes: Routes = [
  { path: 'skills/:urlId', component: SkillsCategoryComponent },
  { path: 'skills', component: SkillsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
