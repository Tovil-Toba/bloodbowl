import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SkillsComponent } from './skills/skills.component';
import { SkillCategoriesComponent } from './skill-categories/skill-categories.component';

@NgModule({
  declarations: [
    SkillsComponent,
    SkillCategoriesComponent
  ],
  imports: [SharedModule],
  providers: [MessageService]
})
export class SkillsModule { }
