import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [enterPageAnimation]
})
export class SkillsComponent implements OnInit {
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(private route: ActivatedRoute) { }

  get id(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Skills' }
    ];
  }

}
