import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SharedCommonModule } from '../shared/shared-common.module';
import { UniqueUrlIdValidatorDirective } from './shared/url-id.directive';
import { StarPlayersComponent } from './star-players/star-players.component';
import { StarPlayerComponent } from './star-player/star-player.component';
import { StarPlayerEditorComponent } from './star-player-editor/star-player-editor.component';
import { StarPlayerFormComponent } from './star-player-form/star-player-form.component';

@NgModule({
  declarations: [
    UniqueUrlIdValidatorDirective,
    StarPlayersComponent,
    StarPlayerComponent,
    StarPlayerEditorComponent,
    StarPlayerFormComponent
  ],
  imports: [
    SharedModule,
    SharedCommonModule
  ],
  providers: [MessageService]
})
export class StarPlayersModule { }
