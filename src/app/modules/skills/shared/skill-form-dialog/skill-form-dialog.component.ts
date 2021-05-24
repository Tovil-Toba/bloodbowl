import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkillModel } from '../skill.model';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-skill-form-dialog',
  templateUrl: './skill-form-dialog.component.html',
  styleUrls: ['./skill-form-dialog.component.css']
})
export class SkillFormDialogComponent implements OnInit {

  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() skill: SkillModel;
  @Output() submittedSkill = new EventEmitter<SkillModel>();

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
  }

  onHide(): void {
    this.visibleChange.emit(false);
  }

  onSkillFormSubmit(skill: SkillModel): void {
    this.skillsService.onSkillFormSubmit(skill);
    this.submittedSkill.emit(skill);
    this.visible = false;
  }

}
