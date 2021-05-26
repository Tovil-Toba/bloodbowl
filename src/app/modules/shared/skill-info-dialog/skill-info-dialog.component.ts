import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SkillModel } from '../../skills/shared/skill.model';

@Component({
  selector: 'app-skill-info-dialog',
  templateUrl: './skill-info-dialog.component.html',
  styleUrls: ['./skill-info-dialog.component.css']
})
export class SkillInfoDialogComponent implements OnInit {

  @Input() skill: SkillModel;
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onHide(): void {
    this.visibleChange.emit(false);
  }
}
