import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { Crud } from '../core/crud';
import { GalleriaImageModel } from '../models/galleria-image.model';

@Injectable({
  providedIn: 'root'
})
export class GalleriaService extends Crud<GalleriaImageModel> {
  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/galleria', http, messageService);
  }
}
