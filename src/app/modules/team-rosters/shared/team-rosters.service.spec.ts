import { TestBed } from '@angular/core/testing';

import { TeamRostersService } from './team-rosters.service';

describe('TeamRostersService', () => {
  let service: TeamRostersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamRostersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
