import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { StarPlayersService } from './star-players.service';
import { StarPlayerModel } from './star-player.model';

@Injectable({ providedIn: 'root' })
export class UniqueUrlIdValidator implements AsyncValidator {
  constructor(private starPlayersService: StarPlayersService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.starPlayersService.getStarPlayersByUrlId$(ctrl.value).pipe(
      map((starPlayers: StarPlayerModel[]) => {
        return (this.starPlayersService.selectedStarPlayerUrlId === ctrl.value || !starPlayers.length)
          ? null
          : { uniqueUrlId: true }
        ;
      }),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueUrlId]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUrlIdValidator),
      multi: true
    }
  ]
})
export class UniqueUrlIdValidatorDirective {
  constructor(private validator: UniqueUrlIdValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
