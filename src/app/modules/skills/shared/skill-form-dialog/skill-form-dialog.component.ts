import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillModel } from '../skill.model';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-skill-form-dialog',
  templateUrl: './skill-form-dialog.component.html',
  styleUrls: ['./skill-form-dialog.component.css']
})
export class SkillFormDialogComponent {

  @Input() skill: SkillModel;
  @Input() visible!: boolean;
  @Output() submittedSkill = new EventEmitter<SkillModel>();
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private skillsService: SkillsService) { }

  onHide(): void {
    this.visibleChange.emit(false);
  }

  onSkillFormSubmit(skill: SkillModel): void {
    this.skillsService.onSkillFormSubmit(skill);
    this.submittedSkill.emit(skill);
    this.visible = false;
  }

}
