import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plays-for-info',
  templateUrl: './plays-for-info.component.html',
  styleUrls: ['./plays-for-info.component.css']
})
export class PlaysForInfoComponent implements OnInit {

  @Input() playsFor: string;

  playsForParts: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.playsForParts = this.playsFor.split('\'');
  }

}
