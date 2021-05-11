import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { GalleriaService } from '../../shared/galleria.service';
import { GalleriaImageModel } from '../../models/galleria-image.model';
import galleriaJson from '../../../assets/data/galleria.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  home: MenuItem;
  galleriaImages: GalleriaImageModel[] = [];

  constructor(private galleriaService: GalleriaService) { }

  getGalleriaImages(): void {
    this.galleriaService.getItems()
      .subscribe((galleriaImages: GalleriaImageModel[]) => {
        this.galleriaImages = galleriaImages;
      });
  }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.getGalleriaImages();
  }

}
