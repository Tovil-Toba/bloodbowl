import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-rosters',
  templateUrl: './team-rosters.component.html',
  styleUrls: ['./team-rosters.component.css'],
  animations: [enterPageAnimation]
})
export class TeamRostersComponent implements OnInit {

  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(private route: ActivatedRoute) { }

  get urlId(): string {
    return this.route.snapshot.paramMap.get('urlId');
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Team Rosters' }
    ];
  }

}
