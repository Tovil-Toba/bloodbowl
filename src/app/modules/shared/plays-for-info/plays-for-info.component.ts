import { Component, Input, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-plays-for-info',
  templateUrl: './plays-for-info.component.html',
  styleUrls: ['./plays-for-info.component.css']
})
export class PlaysForInfoComponent implements OnInit, DoCheck {

  @Input() playsFor: string;

  oldPlaysFor: string;
  playsForParts: string[] = [];

  constructor() { }

  ngDoCheck(): void {
    if (this.playsFor !== this.oldPlaysFor) {
      this.playsForParts = this.playsFor.split('\'');
    }
  }

  ngOnInit(): void {
  }

}
