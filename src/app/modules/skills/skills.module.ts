import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SkillsComponent } from './skills/skills.component';
import { SkillCategoriesComponent } from './skill-categories/skill-categories.component';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { SkillsCategoryComponent } from './skills-category/skills-category.component';

@NgModule({
  declarations: [
    SkillsComponent,
    SkillCategoriesComponent,
    SkillFormComponent,
    SkillsCategoryComponent
  ],
  imports: [SharedModule],
  providers: [MessageService]
})
export class SkillsModule { }
