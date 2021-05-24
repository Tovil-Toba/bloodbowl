import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { SkillsService } from '../../skills/shared/skills.service';
import { SkillModel } from '../../skills/shared/skill.model';
import { Skill } from '../../skills/shared/skill';

@Component({
  selector: 'app-skills-info',
  templateUrl: './skills-info.component.html',
  styleUrls: ['./skills-info.component.css']
})
export class SkillsInfoComponent implements OnInit {

  @Input() skills: string;
  @Output() clickedSkill = new EventEmitter<SkillModel>();

  skillsInfo: SkillModel[] = [];

  constructor(private skillsService: SkillsService) { }

  getSkillsInfo(): void {
    const skillNames = this.skills.split(',');
    for (let skillName of skillNames) {
      skillName = skillName.trim();
      let skill: SkillModel = this.skillsService.getSkillByName(skillName);
      if (!skill) {
        skill = new Skill();
      }
      skill.name = skillName;
      this.skillsInfo.push(skill);
    }
  }

  ngOnInit(): void {
    this.getSkillsInfo();
  }

  onSkillClick(skill: SkillModel): void {
    this.clickedSkill.emit(skill);
  }
}
