import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { TeamRostersService } from './team-rosters.service';
import { TeamRosterModel } from './team-roster.model';

@Injectable({ providedIn: 'root' })
export class UniqueUrlIdValidator implements AsyncValidator {
  constructor(private teamRostersService: TeamRostersService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.teamRostersService.getTeamRostersByUrlId$(ctrl.value).pipe(
      map((teamRosters: TeamRosterModel[]) => {
        return (this.teamRostersService.selectedTeamRosterUrlId === ctrl.value || !teamRosters.length)
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
