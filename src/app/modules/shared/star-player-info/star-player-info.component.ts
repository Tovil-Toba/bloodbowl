import { Component, Input, OnInit, DoCheck } from '@angular/core';
import * as _ from 'lodash';

import { SkillModel } from '../../skills/shared/skill.model';
import { StarPlayerModel } from '../../star-players/shared/star-player.model';
import { StarPlayersService } from '../../star-players/shared/star-players.service';

@Component({
  selector: 'app-star-player-info',
  templateUrl: './star-player-info.component.html',
  styleUrls: ['./star-player-info.component.css']
})
export class StarPlayerInfoComponent implements OnInit, DoCheck {

  @Input() starPlayer: StarPlayerModel;

  oldStarPlayer: StarPlayerModel;
  skill: SkillModel;
  skillInfoDialog = false;

  constructor(
    public starPlayersService: StarPlayersService
  ) { }

  ngDoCheck(): void {
    if (!_.isEqual(this.starPlayer, this.oldStarPlayer)) {
      this.oldStarPlayer = _.clone(this.starPlayer);
    }
  }

  ngOnInit(): void {
  }

  openSkillInfoDialog(skill: SkillModel): void {
    this.skill = skill;
    this.skillInfoDialog = true;
  }

}
