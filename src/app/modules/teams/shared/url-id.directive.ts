import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { TeamsService } from './teams.service';
import { TeamModel } from './team.model';

@Injectable({ providedIn: 'root' })
export class UniqueUrlIdValidator implements AsyncValidator {
  constructor(private teamsService: TeamsService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.teamsService.getTeamsByUrlId$(ctrl.value).pipe(
      map((teams: TeamModel[]) => {
        return (this.teamsService.selectedTeamUrlId === ctrl.value || !teams.length)
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
