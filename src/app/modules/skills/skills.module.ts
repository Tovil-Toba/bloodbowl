import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SkillsComponent } from './skills/skills.component';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { SkillsCategoryComponent } from './skills-category/skills-category.component';
import { SkillFormDialogComponent } from './shared/skill-form-dialog/skill-form-dialog.component';

@NgModule({
  declarations: [
    SkillsComponent,
    SkillFormComponent,
    SkillsCategoryComponent,
    SkillFormDialogComponent
  ],
  imports: [SharedModule],
  providers: [MessageService]
})
export class SkillsModule { }
